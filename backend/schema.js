import {
    date,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
    integer,
} from "drizzle-orm/pg-core";

export const pantryItems = pgTable("pantry_items", {
    id: serial("id").primaryKey(), //id is the primary key and it is serial, meaning it will be auto incremented per added item
    name: varchar("name", { length: 100 }).notNull(),
    quantity: integer("quantity", { limit: 100 }).notNull(),
    unit: varchar("unit", { length: 50 }).notNull(),
    expirationDate: date("expiration_date"),
    createdAt: timestamp("created_at").defaultNow(),
});
