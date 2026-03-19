import { eq, desc, asc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, contactSubmissions, InsertContactSubmission, blogRatings, InsertBlogRating, aioLeads, InsertAioLead } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Contact form submissions
export async function insertContactSubmission(submission: InsertContactSubmission): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert contact submission: database not available");
    throw new Error("Database not available");
  }

  try {
    await db.insert(contactSubmissions).values(submission);
  } catch (error) {
    console.error("[Database] Failed to insert contact submission:", error);
    throw error;
  }
}

export async function getAllContactSubmissions(options?: {
  status?: "new" | "read" | "replied" | "all";
  sortBy?: "createdAt" | "status";
  sortOrder?: "asc" | "desc";
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get contact submissions: database not available");
    return [];
  }

  let query = db.select().from(contactSubmissions);

  // Filter by status
  if (options?.status && options.status !== "all") {
    query = query.where(eq(contactSubmissions.status, options.status)) as any;
  }

  // Sort
  const sortField = options?.sortBy === "status" ? contactSubmissions.status : contactSubmissions.createdAt;
  const sortFn = options?.sortOrder === "asc" ? asc : desc;
  
  return await query.orderBy(sortFn(sortField));
}

export async function updateContactSubmissionStatus(
  id: number,
  status: "new" | "read" | "replied"
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update contact submission: database not available");
    throw new Error("Database not available");
  }

  try {
    await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id));
  } catch (error) {
    console.error("[Database] Failed to update contact submission:", error);
    throw error;
  }
}

// Blog ratings
export async function insertBlogRating(rating: InsertBlogRating): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert blog rating: database not available");
    throw new Error("Database not available");
  }

  try {
    await db.insert(blogRatings).values(rating);
  } catch (error) {
    console.error("[Database] Failed to insert blog rating:", error);
    throw error;
  }
}

export async function checkExistingRating(articleId: number, userIp: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot check existing rating: database not available");
    return false;
  }

  try {
    const result = await db
      .select()
      .from(blogRatings)
      .where(
        and(
          eq(blogRatings.articleId, articleId),
          eq(blogRatings.userIp, userIp)
        )
      )
      .limit(1);
    
    return result.length > 0;
  } catch (error) {
    console.error("[Database] Failed to check existing rating:", error);
    return false;
  }
}

// AIO leads
export async function insertAioLead(lead: InsertAioLead): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert AIO lead: database not available");
    throw new Error("Database not available");
  }
  try {
    await db.insert(aioLeads).values(lead);
  } catch (error) {
    console.error("[Database] Failed to insert AIO lead:", error);
    throw error;
  }
}

export async function getBlogRatingStats(articleId: number): Promise<{
  averageRating: number;
  totalRatings: number;
}> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get blog rating stats: database not available");
    return { averageRating: 0, totalRatings: 0 };
  }

  try {
    const ratings = await db
      .select()
      .from(blogRatings)
      .where(eq(blogRatings.articleId, articleId));
    
    if (ratings.length === 0) {
      return { averageRating: 0, totalRatings: 0 };
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const average = sum / ratings.length;

    return {
      averageRating: Math.round(average * 10) / 10, // Round to 1 decimal
      totalRatings: ratings.length,
    };
  } catch (error) {
    console.error("[Database] Failed to get blog rating stats:", error);
    return { averageRating: 0, totalRatings: 0 };
  }
}
