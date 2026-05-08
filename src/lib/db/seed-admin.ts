/**
 * Seed Admin User Script
 * Run: npx tsx src/lib/db/seed-admin.ts
 *
 * This creates the admin user in the Turso database using better-auth's
 * built-in password hashing so login will work correctly.
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const ADMIN_EMAIL = "admin@scarreefresort.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_NAME = "Admin";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client, { schema });

async function hashPassword(password: string): Promise<string> {
  // better-auth uses bcrypt internally — we replicate the same
  const { default: bcrypt } = await import("bcryptjs");
  return bcrypt.hash(password, 10);
}

async function seedAdmin() {
  console.log("🔐 Seeding admin user...");
  console.log(`   Email: ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log(`   DB URL: ${process.env.TURSO_DATABASE_URL}`);
  console.log("");

  // Check if user already exists
  const existing = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.email, ADMIN_EMAIL),
  });

  if (existing) {
    console.log("⚠️  User already exists! Deleting and re-creating...");
    await client.execute({
      sql: "DELETE FROM account WHERE user_id = ?",
      args: [existing.id],
    });
    await client.execute({
      sql: "DELETE FROM session WHERE user_id = ?",
      args: [existing.id],
    });
    await client.execute({
      sql: "DELETE FROM user WHERE id = ?",
      args: [existing.id],
    });
    console.log("   ✅ Old user removed.");
  }

  const userId = crypto.randomUUID();
  const now = new Date();
  const hashedPassword = await hashPassword(ADMIN_PASSWORD);

  // Insert user
  await client.execute({
    sql: `INSERT INTO user (id, name, email, email_verified, role, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      userId,
      ADMIN_NAME,
      ADMIN_EMAIL,
      1, // emailVerified = true
      "admin",
      now.getTime(),
      now.getTime(),
    ],
  });
  console.log("   ✅ User row created.");

  // Insert account (credential provider)
  const accountId = crypto.randomUUID();
  await client.execute({
    sql: `INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      accountId,
      userId,
      "credential",
      userId,
      hashedPassword,
      now.getTime(),
      now.getTime(),
    ],
  });
  console.log("   ✅ Account (credentials) row created.");

  console.log("\n✅ Admin user seeded successfully!");
  console.log(`   Email: ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
