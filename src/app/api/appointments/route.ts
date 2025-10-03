import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Appointments, Users, Doctor_details } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.user_id;

  
    const appointments = await db
      .select({
        id: Appointments.id,
        user_id: Appointments.user_id,
        doctor_id: Appointments.doctor_id,
        appointment_time: Appointments.appointment_time,
        status: Appointments.status,
        created_at: Appointments.created_at,
        patient: {
          name: Users.name,
          email: Users.email,
        },
        doctor: {
          full_name: Doctor_details.full_name,
          specialization_id: Doctor_details.specialization_id,
        }
      })
      .from(Appointments)
      .innerJoin(Users, eq(Appointments.user_id, Users.user_id))
      .innerJoin(Doctor_details, eq(Appointments.doctor_id, Doctor_details.user_id))
      .where(
        or(
          eq(Appointments.user_id, userId),
          eq(Appointments.doctor_id, userId)
        )
      );

    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { doctor_id, appointment_time } = await request.json();
    const user_id = session.user.user_id;

    const appointment = await db
      .insert(Appointments)
      .values({
        user_id,
        doctor_id,
        appointment_time: new Date(appointment_time),
      })
      .returning();

    return NextResponse.json({ 
      success: true, 
      message: 'Appointment created successfully',
      data: appointment[0]
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}