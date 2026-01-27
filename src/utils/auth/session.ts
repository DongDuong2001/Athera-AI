import { cookies } from 'next/headers';
import prisma from '@/utils/database/prisma';
import { generateToken, verifyToken, getSessionExpiry, SESSION_COOKIE_NAME } from './auth-edge';

export interface SessionUser {
    id: string;
    email: string;
    name: string | null;
    role: string;
    emailVerified: boolean;
}

/**
 * Create a new session for a user
 */
export async function createSession(user: {
    id: string;
    email: string;
    role: string;
}): Promise<{ token: string; expiresAt: Date }> {
    const expiresAt = getSessionExpiry();

    // Create session in database
    const session = await prisma.session.create({
        data: {
            userId: user.id,
            token: crypto.randomUUID(),
            expiresAt,
        },
    });

    // Generate JWT with session reference
    const token = await generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        sessionId: session.id,
    });

    // Update session with JWT token
    await prisma.session.update({
        where: { id: session.id },
        data: { token },
    });

    return { token, expiresAt };
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string, expiresAt: Date): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
        path: '/',
    });
}

/**
 * Get session from cookie and validate
 */
export async function getSession(): Promise<SessionUser | null> {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

        if (!sessionToken) {
            return null;
        }

        // Verify JWT token
        const payload = await verifyToken(sessionToken);
        if (!payload) {
            return null;
        }

        // Verify session exists in database and is not expired
        const session = await prisma.session.findUnique({
            where: { token: sessionToken },
            include: { user: true },
        });

        if (!session || session.expiresAt < new Date()) {
            // Clean up expired session
            if (session) {
                await prisma.session.delete({ where: { id: session.id } });
            }
            return null;
        }

        return {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: session.user.role,
            emailVerified: session.user.emailVerified,
        };
    } catch (error) {
        console.error('Get session error:', error);
        return null;
    }
}

/**
 * Delete session and clear cookie
 */
export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (sessionToken) {
        // Delete session from database
        await prisma.session.deleteMany({
            where: { token: sessionToken },
        });
    }

    // Clear cookie
    cookieStore.delete(SESSION_COOKIE_NAME);
}
