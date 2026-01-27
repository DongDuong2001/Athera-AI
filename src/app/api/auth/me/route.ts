import { getSession } from '@/utils/auth';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const user = await getSession();

        if (!user) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json({ user: null });
    }
}
