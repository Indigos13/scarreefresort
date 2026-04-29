import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ============================================
// VILLAS — Room/property data managed via admin
// ============================================
export const villas = sqliteTable("villas", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").default(""),
  description: text("description").default(""),
  basePrice: integer("base_price").notNull().default(0), // USD per night
  addGuestPrice: integer("add_guest_price").notNull().default(0),
  maxGuests: integer("max_guests").notNull().default(2),
  bedrooms: integer("bedrooms").notNull().default(1),
  bathrooms: integer("bathrooms").notNull().default(1),
  image: text("image").default(""),
  gallery: text("gallery").default("[]"), // JSON string array
  amenities: text("amenities").default("[]"), // JSON string array
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ============================================
// RESERVATIONS — All bookings from any source
// ============================================
export const reservations = sqliteTable("reservations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  villaId: text("villa_id").notNull(),
  checkIn: text("check_in").notNull(), // ISO date string YYYY-MM-DD
  checkOut: text("check_out").notNull(), // ISO date string YYYY-MM-DD
  guestName: text("guest_name"),
  guestEmail: text("guest_email"),
  guestPhone: text("guest_phone"),
  adultCount: integer("adult_count").default(1),
  childCount: integer("child_count").default(0),
  totalPrice: integer("total_price"), // in cents
  source: text("source").notNull().default("direct"), // direct | airbnb | bookingcom
  externalId: text("external_id"), // UID from iCal event (for dedup)
  summary: text("summary"), // Event summary from iCal
  status: text("status").notNull().default("confirmed"), // pending | confirmed | cancelled
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ============================================
// ICAL SOURCES — Import URLs from OTA platforms
// ============================================
export const icalSources = sqliteTable("ical_sources", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  villaId: text("villa_id").notNull(),
  platform: text("platform").notNull(), // airbnb | bookingcom
  icalUrl: text("ical_url").notNull(),
  lastSyncAt: text("last_sync_at"),
  lastSyncStatus: text("last_sync_status"), // success | error
  lastSyncError: text("last_sync_error"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ============================================
// BETTER AUTH TABLES — Auto-managed by Better Auth
// ============================================
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  role: text("role").default("admin"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});
