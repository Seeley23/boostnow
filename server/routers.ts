import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { insertContactSubmission, insertBlogRating, checkExistingRating, getBlogRatingStats } from "./db";
import { sendContactFormNotification } from "./email";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  blogRating: router({
    // Submit a rating for a blog article
    submit: publicProcedure
      .input(
        z.object({
          articleId: z.number().min(1).max(50),
          rating: z.number().min(1).max(5),
          feedback: z.string().max(500).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Get user IP for deduplication
        let userIp: string | string[] | undefined = 'unknown';
        try {
          if (ctx.req) {
            userIp = ctx.req.ip || (ctx.req.headers && ctx.req.headers['x-forwarded-for']) || (ctx.req.headers && ctx.req.headers['x-real-ip']) || (ctx.req.socket && ctx.req.socket.remoteAddress) || 'unknown';
          }
        } catch (e) {
          console.warn('[BlogRating] Failed to get user IP:', e);
        }
        const ipString = Array.isArray(userIp) ? userIp[0] : String(userIp || 'unknown');

        // Sanitize feedback
        const sanitizedFeedback = input.feedback ? DOMPurify.sanitize(input.feedback, { ALLOWED_TAGS: [] }) : undefined;

        const { insertBlogRating, checkExistingRating } = await import("./db");
        
        // Check if user already rated this article (by IP)
        const existingRating = await checkExistingRating(input.articleId, ipString);
        if (existingRating) {
          throw new Error("Już oceniłeś ten artykuł");
        }

        // Save rating to database
        await insertBlogRating({
          articleId: input.articleId,
          rating: input.rating,
          feedback: sanitizedFeedback,
          userIp: ipString,
        });
        
        return {
          success: true,
          message: "Dziękujemy za ocenę!",
        };
      }),

    // Get ratings statistics for an article
    getStats: publicProcedure
      .input(
        z.object({
          articleId: z.number().min(1).max(50),
        })
      )
      .query(async ({ input }) => {
        const { getBlogRatingStats } = await import("./db");
        return getBlogRatingStats(input.articleId);
      }),
  }),

  contact: router({
    // Get all contact submissions (admin only)
    getAll: publicProcedure
      .input(
        z.object({
          status: z.enum(["new", "read", "replied", "all"]).optional(),
          sortBy: z.enum(["createdAt", "status"]).optional().default("createdAt"),
          sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
        })
      )
      .query(async ({ ctx, input }) => {
        // Check if user is admin
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }

        const { getAllContactSubmissions } = await import("./db");
        return getAllContactSubmissions(input);
      }),

    // Update contact submission status (admin only)
    updateStatus: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "read", "replied"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Check if user is admin
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }

        const { updateContactSubmissionStatus } = await import("./db");
        await updateContactSubmissionStatus(input.id, input.status);
        
        return {
          success: true,
          message: "Status updated successfully",
        };
      }),

    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email"),
          company: z.string().optional(),
          message: z.string().min(10, "Message must be at least 10 characters"),
          recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
        })
      )
      .mutation(async ({ input }) => {
        // Verify reCAPTCHA token
        const { verifyRecaptchaToken } = await import("./recaptcha");
        const recaptchaResult = await verifyRecaptchaToken(
          input.recaptchaToken,
          "contact_form"
        );

        if (!recaptchaResult.success) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "reCAPTCHA verification failed. Please try again.",
          });
        }

        // Check reCAPTCHA score (0.0 = bot, 1.0 = human)
        if (recaptchaResult.score && recaptchaResult.score < 0.5) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Suspicious activity detected. Please try again.",
          });
        }

        console.log("[Contact] reCAPTCHA verified. Score:", recaptchaResult.score);

        // Sanitize input data to prevent XSS attacks
        const sanitizedInput = {
          name: DOMPurify.sanitize(input.name, { ALLOWED_TAGS: [] }),
          email: DOMPurify.sanitize(input.email, { ALLOWED_TAGS: [] }),
          company: input.company ? DOMPurify.sanitize(input.company, { ALLOWED_TAGS: [] }) : undefined,
          message: DOMPurify.sanitize(input.message, { ALLOWED_TAGS: [] }),
        };

        console.log("[Contact] Sanitized input:", sanitizedInput);

        // Save to database
        await insertContactSubmission(sanitizedInput);
        
        // Send email notification
        const emailSent = await sendContactFormNotification(sanitizedInput);
        
        if (!emailSent) {
          console.warn("[Contact] Email notification failed, but submission saved");
        }
        
        return {
          success: true,
          message: "Wiadomość wysłana pomyślnie!",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
