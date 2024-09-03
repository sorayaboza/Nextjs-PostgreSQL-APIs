import { NextResponse } from 'next/server';
import { pool } from '@/app/data/db';

// Handle GET request
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM my_table');
    client.release();
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Error fetching my_table:', err);
    return NextResponse.error(new Error('Failed to fetch my_table'));
  }
}

// Handle POST request
export async function POST(req) {
  const { description, category } = await req.json();
  
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO my_table (description, category) VALUES ($1, $2) RETURNING *',
      [description, category]
    );
    client.release();
    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding to my_table:', err);
    return NextResponse.error(new Error('Failed to add item'));
  }
}

// Handle DELETE request
export async function DELETE(req) {
  const { id } = await req.json();
  
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM my_table WHERE id = $1', [id]);
    client.release();
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting from my_table:', err);
    return NextResponse.error(new Error('Failed to delete item'));
  }
}
