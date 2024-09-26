CREATE TABLE IF NOT EXISTS "categories" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meta" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"avatar" varchar(10),
	"description" varchar(500),
	"title" varchar(255),
	"category_id" varchar(30) NOT NULL,
	"tags" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" varchar(30) PRIMARY KEY NOT NULL,
	"author" varchar(255) NOT NULL,
	"homepage" varchar(255),
	"identifier" varchar(255) NOT NULL,
	"schema_version" integer NOT NULL,
	"meta_id" varchar(30) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meta" ADD CONSTRAINT "meta_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_meta_id_meta_id_fk" FOREIGN KEY ("meta_id") REFERENCES "public"."meta"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
