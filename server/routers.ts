import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { insertContactSubmission } from "./db";
import { sendContactFormNotification } from "./email";

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
        })
      )
      .mutation(async ({ input }) => {
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
