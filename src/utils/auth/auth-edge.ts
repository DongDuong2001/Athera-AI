import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-min-32-characters!'
);
const JWT_ISSUER = 'athera-ai';
const JWT_AUDIENCE = 'athera-ai-users';

export interface TokenPayload extends JWTPayload {
    userId: string;
    email: string;
    role: string;
    sessionId: string;
}

/**
 * Generate a JWT token for authentication
 */
export async function generateToken(payload: Omit<TokenPayload, 'iat' | 'exp' | 'iss' | 'aud'>): Promise<string> {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(JWT_ISSUER)
        .setAudience(JWT_AUDIENCE)
        .setExpirationTime('7d')
        .sign(JWT_SECRET);

    return token;
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET, {
            issuer: JWT_ISSUER,
            audience: JWT_AUDIENCE,
        });

        return payload as TokenPayload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

/**
 * Generate a random 6-digit OTP
 */
export function generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Get OTP expiration time (10 minutes from now)
 */
export function getOtpExpiry(): Date {
    return new Date(Date.now() + 10 * 60 * 1000);
}

/**
 * Get session expiration time (7 days from now)
 */
export function getSessionExpiry(): Date {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}

export const SESSION_COOKIE_NAME = 'athera-session';

/**
 * Get session token from cookie (for middleware)
 */
export function getSessionToken(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(';').map(c => c.trim());
    const sessionCookie = cookies.find(c => c.startsWith(`${SESSION_COOKIE_NAME}=`));

    if (!sessionCookie) return null;

    return sessionCookie.split('=')[1];
}
