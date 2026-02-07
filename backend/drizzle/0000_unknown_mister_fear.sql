CREATE TABLE "pantry_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"quantity" integer NOT NULL,
	"unit" varchar(50) NOT NULL,
	"expiration_date" date,
	"created_at" timestamp DEFAULT now()
);
