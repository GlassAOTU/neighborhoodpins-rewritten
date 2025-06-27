import { NextRequest } from 'next/server'
import pool from '@/lib/db' // your pg pool

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {
            latitude,
            longitude,
            issue_type,
            street,
            town,
            zipcode,
            municipality
        } = body

        await pool.query(
            `
      INSERT INTO submitted_pins (
        latitude,
        longitude,
        issue_type,
        street,
        town,
        zipcode,
        municipality
      ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      `,
            [
                latitude,
                longitude,
                issue_type,
                street,
                town,
                zipcode,
                municipality
            ]
        )

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (err: any) {
        console.error('INSERT ERROR:', err?.message, err?.stack)
        return new Response(JSON.stringify({ error: 'Failed to insert pin', details: err?.message }), { status: 500 })
    }
}
