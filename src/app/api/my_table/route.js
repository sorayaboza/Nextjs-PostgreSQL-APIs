import { NextResponse } from 'next/server'
import { pool } from '@/app/data/db'


export async function GET() {
  try {
    const client = await pool.connect(); // Connecting to DB using pool
    // SQL query to get all rows from ‘my_table’ table
    const result = await client.query('SELECT * FROM my_table')
    client.release(); // Releases connection back to pool to be reused


    return NextResponse.json(result.rows)
  } catch (err) {
    console.error('Error fetching my_table, err')
    return NextResponse.error(new Error('Failed to fetch my_table'));
  }
}
