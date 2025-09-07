import { cookies } from "next/headers";
import { db } from "@/db";
import { Users, Sessions, Appointments, Patient_details } from "@/db/schema";
import { eq, and, gte, lt } from "drizzle-orm";

export async function getCurrentUser() {
  const sessionId = (await cookies()).get("session")?.value;

  if (!sessionId) {
    return null;
  }

  const result = await db
    .select({
      user_id: Users.user_id,
      name: Users.name,
      email: Users.email,
      role: Users.role,
    })
    .from(Sessions)
    .innerJoin(Users, eq(Sessions.user_id, Users.user_id))
    .where(
      and(
        eq(Sessions.session_id, sessionId),
        gte(Sessions.expires_at, new Date())
      )
    )
    .limit(1);

  return result[0] || null;
}

export async function getTodaysAppointments(doctorId: number) {
  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const appointments = await db
    .select({
      id: Appointments.id,
      appointment_time: Appointments.appointment_time,
      status: Appointments.status,
      patient: {
        full_name: Patient_details.full_name,
        phone: Patient_details.phone,
        age: Patient_details.age,
        gender: Patient_details.gender,
        picture: Users.picture,
      },
    })
    .from(Appointments)
    .innerJoin(
      Patient_details,
      eq(Appointments.user_id, Patient_details.user_id)
    )
    .innerJoin(Users, eq(Appointments.user_id, Users.user_id))
    .where(
      and(
        eq(Appointments.doctor_id, doctorId),
        gte(Appointments.appointment_time, startOfDay),
        lt(Appointments.appointment_time, endOfDay)
      )
    )
    .orderBy(Appointments.appointment_time);

  return appointments;
}
