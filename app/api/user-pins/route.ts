import { auth0 } from '@/lib/auth0';
import pool from '@/lib/db';

export async function GET() {
    const session = await auth0.getSession();

    if (!session || !session.user) {
        return new Response(JSON.stringify({ error: 'Not logged in' }), { status: 401 });
    }

    const userId = session.user.sub;

    try {
        // const result = await pool.query(
        //     'SELECT * FROM submitted_pins WHERE submitted_by = $1',
        //     [userId]
        // );
        const result = await pool.query(`
            SELECT 
                sp.id,
                sp.issue_type,
                it.type AS issue_type_name,
                sp.street,
                sp.town,
                sp.zipcode,
                sp.municipality,
                m.department,
                sp.date_created
            FROM submitted_pins sp
            JOIN issue_types it ON sp.issue_type = it.id
            JOIN municipalities m ON sp.municipality = m.name
            WHERE submitted_by = $1
        `, [userId])

        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err: any) {
        console.error('SELECT ERROR:', err.message);
        return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
    }
}