import { NextRequest } from 'next/server'
import pool from '@/lib/db' // your pg pool

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM municipalities ORDER BY name ASC')

        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (err: any) {
        console.error('SELECT ERROR:', err?.message, err?.stack)
        return new Response(JSON.stringify({ error: 'Failed to fetch pins', details: err?.message }), { status: 500 })
    }
}
