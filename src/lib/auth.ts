import { NextRequest } from 'next/server';
import { db } from '@/db';
import { Sessions, Users } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';

export async function validateSession(request: NextRequest) {
  const sessionId = request.cookies.get('session')?.value;
  
  if (!sessionId) {
    return null;
  }

  const session = await db
    .select({
      user_id: Sessions.user_id,
      expires_at: Sessions.expires_at,
      user: {
        user_id: Users.user_id,
        name: Users.name,
        email: Users.email,
        role: Users.role,
      }
    })
    .from(Sessions)
    .innerJoin(Users, eq(Sessions.user_id, Users.user_id))
    .where(
      and(
        eq(Sessions.session_id, sessionId),
        gt(Sessions.expires_at, new Date())
      )
    )
    .limit(1);

  return session[0] || null;
}