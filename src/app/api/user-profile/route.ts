import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    console.log('User profile data:', userData);

    return NextResponse.json({ success: true, message: 'User profile created successfully' });
  } catch (error) {
    console.error('Error creating user profile:', error);
    return NextResponse.json({ error: 'Failed to create user profile' }, { status: 500 });
  }
}