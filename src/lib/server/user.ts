import { db } from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(googleId: string, email: string, name: string, picture: string): Promise<User> {
    const rows = await db
        .insert(Users)
        .values({
            google_id: googleId,
            email: email,
            name: name,
            picture: picture
        })
        .returning({ id: Users.user_id });

	if (rows === null) {
		throw new Error("Unexpected error");
	}
	const user: User = {
		id: rows[0].id,
		googleId,
		email,
		name,
		picture,
        role: 'U'
	};
	return user;
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
    const rows = await db
        .select({
            id: Users.user_id,
            googleId: Users.google_id,
            email: Users.email,
            role: Users.role,
            name: Users.name,
            picture: Users.picture
        })
        .from(Users)
        .where(eq(Users.google_id, googleId));

    if (rows.length === 0) {
        return null;
    }

    const userRow = rows[0];


    const user: User = {
        id: userRow.id,
        googleId: userRow.googleId,
        email: userRow.email,
        name: userRow.name,
        picture: userRow.picture,
        role: userRow.role
    };

    return user;
}


export interface User {
	id: number;
	email: string;
	googleId: string;
	name: string;
	picture: string;
    role: string;
}