CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"doctor_id" integer NOT NULL,
	"appointment_time" timestamp NOT NULL,
	"status" char(1) DEFAULT 'S' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "doctor_details" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"full_name" varchar NOT NULL,
	"age" integer NOT NULL,
	"gender" char(1) NOT NULL,
	"phone" varchar NOT NULL,
	"picture" text NOT NULL,
	"address" text NOT NULL,
	"experience" integer NOT NULL,
	"location" varchar NOT NULL,
	"fees" integer NOT NULL,
	"specialization_id" integer NOT NULL,
	"languages" text NOT NULL,
	"bio" text NOT NULL,
	"reg_no" varchar NOT NULL,
	"status" char(1) DEFAULT 'P' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "doctor_details_reg_no_unique" UNIQUE("reg_no")
);
--> statement-breakpoint
CREATE TABLE "patient_details" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"full_name" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"age" integer NOT NULL,
	"gender" char(1) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "specializations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "specializations_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"google_id" text NOT NULL,
	"name" varchar NOT NULL,
	"email" text NOT NULL,
	"picture" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"role" char(1) DEFAULT 'U' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_users_user_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctor_details" ADD CONSTRAINT "doctor_details_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctor_details" ADD CONSTRAINT "doctor_details_specialization_id_specializations_id_fk" FOREIGN KEY ("specialization_id") REFERENCES "public"."specializations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient_details" ADD CONSTRAINT "patient_details_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;