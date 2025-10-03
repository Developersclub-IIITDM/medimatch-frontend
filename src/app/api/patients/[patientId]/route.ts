import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Patient_details } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { patientId: string } }
) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const patientId = parseInt(params.patientId);
    const body = await request.json();

    const updateData: any = {};

   
    if (body.full_name) updateData.full_name = body.full_name;
    if (body.phone) updateData.phone = body.phone;
    if (body.age) updateData.age = body.age;
    if (body.gender) updateData.gender = body.gender;

    await db
      .update(Patient_details)
      .set(updateData)
      .where(eq(Patient_details.user_id, patientId));

    return NextResponse.json({ 
      success: true, 
      message: 'Patient profile updated successfully' 
    });
  } catch (error) {
    console.error('Error updating patient profile:', error);
    return NextResponse.json({ error: 'Failed to update patient profile' }, { status: 500 });
  }
}