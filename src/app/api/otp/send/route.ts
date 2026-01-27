import prisma from '@/utils/database/prisma';
import { hashPassword, generateOtp, getOtpExpiry } from '@/utils/auth';
import { validateEmail } from '@/utils/email';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const validatedEmail = await validateEmail(email);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedEmail.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Generate OTP
    const otp = generateOtp();
    const expiresAt = getOtpExpiry();

    // Delete any existing OTP for this email
    await prisma.otpVerification.deleteMany({
      where: { email: validatedEmail.toLowerCase() },
    });

    // Store OTP with hashed password
    await prisma.otpVerification.create({
      data: {
        email: validatedEmail.toLowerCase(),
        otp,
        passwordHash,
        expiresAt,
      },
    });

    // In production, send email with OTP
    // For now, log it to console for development
    console.log(`[DEV] OTP for ${validatedEmail}: ${otp}`);

    // TODO: Send actual email using your preferred email service
    // await sendEmail({
    //   to: validatedEmail,
    //   subject: 'Verify your Athera AI account',
    //   body: `Your verification code is: ${otp}`,
    // });

    return NextResponse.json({
      message: 'OTP sent successfully',
      // Remove this in production - only for development
      ...(process.env.NODE_ENV === 'development' && { otp }),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
