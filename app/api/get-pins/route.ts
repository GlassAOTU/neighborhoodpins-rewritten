import { NextRequest } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
    try {
        const result = await pool.query(`
            SELECT 
                sp.id,
                sp.latitude,
                sp.longitude,
                sp.issue_type,
                it.type AS issue_type_name,
                sp.street,
                sp.town,
                sp.zipcode,
                sp.municipality,
                m.department,
                m.phone_number
            FROM submitted_pins sp
            JOIN issue_types it ON sp.issue_type = it.id
            JOIN municipalities m ON sp.municipality = m.name
        `)

        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (err: any) {
        console.error('SELECT ERROR:', err?.message, err?.stack)
        return new Response(JSON.stringify({ error: 'Failed to fetch pins', details: err?.message }), { status: 500 })
    }
}