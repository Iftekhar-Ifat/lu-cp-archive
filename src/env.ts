import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // DB (Prisma Postgres DB)
    DATABASE_URL: z.string().url(),
    PULSE_API_KEY: z.string().min(1),

    // Auth (Clerk)
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_WEBHOOK_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    // DB
    DATABASE_URL: process.env.DATABASE_URL,
    PULSE_API_KEY: process.env.PULSE_API_KEY,

    // Auth (Clerk)
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,

    // Client
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});
