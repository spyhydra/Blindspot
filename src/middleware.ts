import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // We can't strictly verify Firebase auth on the edge without the Admin SDK parsing cookies.
    // As a lightweight hackathon solution, we redirect client-side in components OR verify a generic flag if set.
    // Actually, let's keep it simple: no true server-side block here unless we implement cookie syncing.
    // Instead, we will rely on client-side protection by AuthContext within layout / page,
    // or a simple cookie check if one is implemented. For now, pass all and let AuthContext redirect.
    // This satisfies Vercel edge without heavy setup.
    return NextResponse.next();
}

export const config = {
    matcher: ["/studio", "/assessment", "/results"],
};
