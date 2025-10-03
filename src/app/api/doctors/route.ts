import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Doctor_details, Users, Specializations } from '@/db/schema';
import { eq, and, gte, lte, like, sql } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const specialization_id = searchParams.get('specialization_id');
    const name = searchParams.get('name');
    const min_fee = searchParams.get('min_fee');
    const max_fee = searchParams.get('max_fee');
    const language = searchParams.get('language');
    const min_experience = searchParams.get('min_experience');
    const max_experience = searchParams.get('max_experience');

   
    const conditions = [eq(Doctor_details.status, 'A')];

    if (specialization_id) {
      conditions.push(eq(Doctor_details.specialization_id, parseInt(specialization_id)));
    }

    if (name) {
      conditions.push(like(Doctor_details.full_name, `%${name}%`));
    }

    if (min_fee) {
      conditions.push(gte(Doctor_details.fees, parseInt(min_fee)));
    }

    if (max_fee) {
      conditions.push(lte(Doctor_details.fees, parseInt(max_fee)));
    }

    if (language) {
      conditions.push(like(Doctor_details.languages, `%${language}%`));
    }

    if (min_experience) {
      conditions.push(gte(Doctor_details.experience, parseInt(min_experience)));
    }

    if (max_experience) {
      conditions.push(lte(Doctor_details.experience, parseInt(max_experience)));
    }

    
    const doctors = await db
      .select({
        user_id: Doctor_details.user_id,
        full_name: Doctor_details.full_name,
        age: Doctor_details.age,
        gender: Doctor_details.gender,
        phone: Doctor_details.phone,
        picture: Doctor_details.picture,
        address: Doctor_details.address,
        experience: Doctor_details.experience,
        location: Doctor_details.location,
        fees: Doctor_details.fees,
        languages: Doctor_details.languages,
        bio: Doctor_details.bio,
        reg_no: Doctor_details.reg_no,
        status: Doctor_details.status,
        specialization: {
          id: Specializations.id,
          name: Specializations.name,
        }
      })
      .from(Doctor_details)
      .innerJoin(Users, eq(Doctor_details.user_id, Users.user_id))
      .innerJoin(Specializations, eq(Doctor_details.specialization_id, Specializations.id))
      .where(and(...conditions));

    return NextResponse.json({ success: true, data: doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}