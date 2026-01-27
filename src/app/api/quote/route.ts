import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch from ZenQuotes (Free tier, no key required)
        // Using a proxy to avoid CORS on client if strictly client-fetches, 
        // but here we just fetch server-side and return to our client.
        const res = await fetch("https://zenquotes.io/api/random", {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Quote fetch error:", error);
        // Fallback quote
        return NextResponse.json([
            { q: "Peace comes from within. Do not seek it without.", a: "Buddha" }
        ]);
    }
}
