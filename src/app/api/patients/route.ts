import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Patient_details, Users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { full_name, age, gender, phone } = await request.json();
    const userId = session.user.user_id;

 
    await db
      .update(Users)
      .set({ role: 'U' })
      .where(eq(Users.user_id, userId));


    await db
      .insert(Patient_details)
      .values({
        user_id: userId,
        full_name,
        phone,
        age,
        gender,
      })
      .onConflictDoUpdate({
        target: Patient_details.user_id,
        set: { full_name, phone, age, gender },
      });

    return NextResponse.json({ 
      success: true, 
      message: 'Patient profile created successfully' 
    });
  } catch (error) {
    console.error('Error creating patient profile:', error);
    return NextResponse.json({ error: 'Failed to create patient profile' }, { status: 500 });
  }
}