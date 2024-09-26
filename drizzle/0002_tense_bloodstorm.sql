ALTER TABLE "meta" DROP CONSTRAINT "meta_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category_id" varchar(30) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "meta" DROP COLUMN IF EXISTS "category_id";