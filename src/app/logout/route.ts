"use server";

import { getCurrentSession, invalidateSession, deleteSessionTokenCookie } from "@/lib/server/session";
import { redirect } from "next/navigation";

export async function GET(req: Request){
	const { session } = await getCurrentSession();
	if (!session) {
		return new Response(null, {
			status: 401
		})
	}

	await invalidateSession(session.id);
	await deleteSessionTokenCookie();
	return redirect("/");
}
