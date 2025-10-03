import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { Doctor_details, Users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { doctorId: string } }
) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const doctorId = parseInt(params.doctorId);
    const formData = await request.formData();

    const doctorData = {
      full_name: formData.get('full_name') as string,
      age: parseInt(formData.get('age') as string),
      gender: formData.get('gender') as string,
      phone: formData.get('phone') as string,
      picture: formData.get('picture') as string,
      address: formData.get('address') as string,
      experience: parseInt(formData.get('experience') as string),
      location: formData.get('location') as string,
      fees: parseInt(formData.get('fees') as string),
      specialization_id: parseInt(formData.get('specialization_id') as string),
      languages: formData.get('languages') as string,
      bio: formData.get('bio') as string,
      reg_no: formData.get('reg_no') as string,
    };


    await db
      .update(Users)
      .set({ role: 'D' })
      .where(eq(Users.user_id, doctorId));


    await db
      .insert(Doctor_details)
      .values({
        user_id: doctorId,
        ...doctorData,
      })
      .onConflictDoUpdate({
        target: Doctor_details.user_id,
        set: doctorData,
      });

    return NextResponse.json({ 
      success: true, 
      message: 'Doctor profile created/updated successfully' 
    });
  } catch (error) {
    console.error('Error creating/updating doctor profile:', error);
    return NextResponse.json({ error: 'Failed to create/update doctor profile' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { doctorId: string } }
) {
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const doctorId = parseInt(params.doctorId);
    const formData = await request.formData();

    const updateData: any = {};

    if (formData.get('full_name')) updateData.full_name = formData.get('full_name');
    if (formData.get('age')) updateData.age = parseInt(formData.get('age') as string);
    if (formData.get('gender')) updateData.gender = formData.get('gender');
    if (formData.get('phone')) updateData.phone = formData.get('phone');
    if (formData.get('picture')) updateData.picture = formData.get('picture');
    if (formData.get('address')) updateData.address = formData.get('address');
    if (formData.get('experience')) updateData.experience = parseInt(formData.get('experience') as string);
    if (formData.get('location')) updateData.location = formData.get('location');
    if (formData.get('fees')) updateData.fees = parseInt(formData.get('fees') as string);
    if (formData.get('specialization_id')) updateData.specialization_id = parseInt(formData.get('specialization_id') as string);
    if (formData.get('languages')) updateData.languages = formData.get('languages');
    if (formData.get('bio')) updateData.bio = formData.get('bio');
    if (formData.get('reg_no')) updateData.reg_no = formData.get('reg_no');


    await db
      .update(Doctor_details)
      .set(updateData)
      .where(eq(Doctor_details.user_id, doctorId));

    return NextResponse.json({ 
      success: true, 
      message: 'Doctor profile updated successfully' 
    });
  } catch (error) {
    console.error('Error updating doctor profile:', error);
    return NextResponse.json({ error: 'Failed to update doctor profile' }, { status: 500 });
  }
}