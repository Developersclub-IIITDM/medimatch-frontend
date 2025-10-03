import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Appointments } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const appointmentId = parseInt(params.appointmentId);
    const body = await request.json();

    const updateData: any = {};


    if (body.status) updateData.status = body.status;
    if (body.appointment_time) updateData.appointment_time = new Date(body.appointment_time);


    await db
      .update(Appointments)
      .set(updateData)
      .where(eq(Appointments.id, appointmentId));

    return NextResponse.json({ 
      success: true, 
      message: 'Appointment updated successfully' 
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}