import prisma from '@/utils/database/prisma';
import { createSession, setSessionCookie } from '@/utils/auth';
import { validateEmail, validateOtp } from '@/utils/email';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const validatedEmail = await validateEmail(email);
    const validatedOtp = await validateOtp(otp);

    // Find OTP record
    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        email: validatedEmail.toLowerCase(),
        otp: validatedOtp,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    // Create user with verified email
    const user = await prisma.user.create({
      data: {
        email: validatedEmail.toLowerCase(),
        passwordHash: otpRecord.passwordHash,
        emailVerified: true,
      },
    });

    // Delete OTP record
    await prisma.otpVerification.delete({
      where: { id: otpRecord.id },
    });

    // Create session
    const { token, expiresAt } = await createSession({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Set session cookie
    await setSessionCookie(token, expiresAt);

    return NextResponse.json({
      message: 'Account verified successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
