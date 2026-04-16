import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body as { email?: string };

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { success: false, message: "Invalid email address." },
                { status: 400 }
            );
        }

        // TODO: Connect to your mailing service (e.g. Resend, Mailchimp)
        console.log("[Waitlist] New signup:", email);

        return NextResponse.json(
            { success: true, message: "You have been added to the waitlist!" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
