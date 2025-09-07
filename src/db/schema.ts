import { integer, varchar, char, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';


export const Users = pgTable('users', {
    user_id: serial('user_id').primaryKey().notNull(),
    google_id: text('google_id').notNull(),
    name: varchar("name").notNull(),
    email: text('email').notNull(),
    picture: text('picture').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    role: char('role', { length: 1 }).default('U').notNull(), // 'A' for Admin, 'D' for Doctor, 'U' for User

});

export const Sessions = pgTable('sessions', {
    session_id: text('session_id').primaryKey().notNull(),
    user_id: integer('user_id').notNull().references(() => Users.user_id),
    expires_at: timestamp('expires_at').notNull(),

});

export const Specializations = pgTable('specializations', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name').notNull().unique(),
});


export const Doctor_details = pgTable('doctor_details', {
    user_id: integer('user_id').primaryKey().notNull().references(() => Users.user_id),
    full_name: varchar('full_name').notNull(),
    age: integer('age').notNull(),
    gender: char('gender', { length: 1 }).notNull(), // 'M', 'F', 'O'
    phone: varchar('phone').notNull(),
    picture: text('picture').notNull(),
    address: text('address').notNull(),
    
    experience: integer('experience').notNull(), // in years
    location: varchar('location').notNull(),
    fees: integer('fees').notNull(), // consultation fees
    specialization_id: integer('specialization_id').notNull().references(() => Specializations.id),
    languages: text('languages').notNull(), // comma-separated languages
    bio: text('bio').notNull(),
    reg_no: varchar('reg_no').notNull().unique(), // registration number

    status: char('status', { length: 1 }).default('P').notNull(), // 'U' unverified, 'I' inactive, 'A' active
    created_at: timestamp('created_at').defaultNow().notNull(),
});

export const Patient_details = pgTable('patient_details', {
    user_id: integer('user_id').primaryKey().notNull().references(() => Users.user_id),
    full_name: varchar('full_name').notNull(),
    phone: varchar('phone').notNull(),
    age: integer('age').notNull(),
    gender: char('gender', { length: 1 }).notNull(), // 'M', 'F', 'O'
});

export const Appointments = pgTable('appointments', {
    id: serial('id').primaryKey().notNull(),
    user_id: integer('user_id').notNull().references(() => Users.user_id),
    doctor_id: integer('doctor_id').notNull().references(() => Users.user_id),

    appointment_time: timestamp('appointment_time').notNull(),
    status: char('status', { length: 1 }).default('S').notNull(), // 'S' for Scheduled, 'C' for Completed, 'X' for Cancelled

    created_at: timestamp('created_at').defaultNow().notNull(),
});


