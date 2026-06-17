import { NextRequest, NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const noStoreHeaders = {
    'Cache-Control': 'no-store, max-age=0',
};

export async function POST(request: NextRequest) {
    const apiKey = process.env.BUTTONDOWN_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { message: 'Newsletter signup is not configured yet.' },
            { status: 503, headers: noStoreHeaders },
        );
    }

    const body = await request.json().catch(() => null) as { email?: string } | null;
    const email = body?.email?.trim().toLowerCase();

    if (!email || !emailPattern.test(email)) {
        return NextResponse.json(
            { message: 'Enter a valid email address.' },
            { status: 400, headers: noStoreHeaders },
        );
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor?.split(',')[0]?.trim();

    const response = await fetch('https://api.buttondown.com/v1/subscribers', {
        method: 'POST',
        headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': 'application/json',
            'X-Buttondown-Collision-Behavior': 'add',
        },
        body: JSON.stringify({
            email_address: email,
            tags: ['portfolio-site'],
            referrer_url: request.headers.get('referer') ?? undefined,
            ip_address: ipAddress || undefined,
            metadata: {
                source: 'portfolio-site',
            },
        }),
    });

    if (response.ok) {
        return NextResponse.json({
            message: 'Please check your inbox to confirm your subscription.',
        }, { headers: noStoreHeaders });
    }

    if (response.status === 400 || response.status === 409) {
        return NextResponse.json({
            message: 'You are already on the list. Check your inbox if confirmation is pending.',
        }, { headers: noStoreHeaders });
    }

    if (response.status === 429) {
        return NextResponse.json(
            { message: 'Too many signup attempts right now. Please try again later.' },
            { status: 429, headers: noStoreHeaders },
        );
    }

    return NextResponse.json(
        { message: 'Newsletter signup is unavailable right now. Please try again later.' },
        { status: 502, headers: noStoreHeaders },
    );
}
