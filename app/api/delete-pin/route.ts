import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';
import db from '@/lib/db'; // however you're doing your DB

export async function POST(req: Request) {
    const session = await auth0.getSession();
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();

    // optional: confirm pin belongs to this user
    await db.query('DELETE FROM submitted_pins WHERE id = $1', [id]);

    return NextResponse.json({ success: true });
}
