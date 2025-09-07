import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const doctorData = {
      fullName: formData.get('fullName'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      phone: formData.get('phone'),
      specialization: formData.get('specialization'),
      experience: formData.get('experience'),
      regNo: formData.get('regNo'),
      languages: formData.get('languages'),
      address: formData.get('address'),
      bio: formData.get('bio'),
      picture: formData.get('picture')
    };

    console.log('Doctor profile data:', doctorData);

    return NextResponse.json({ success: true, message: 'Doctor profile created successfully' });
  } catch (error) {
    console.error('Error creating doctor profile:', error);
    return NextResponse.json({ error: 'Failed to create doctor profile' }, { status: 500 });
  }
}