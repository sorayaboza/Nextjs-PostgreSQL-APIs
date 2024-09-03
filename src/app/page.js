// src/app/page.js

import { pool } from '@/app/data/db';

// The Home component is now an async component to fetch data directly
export default async function Home() {
  let data = []; // Initialize an empty array to store the data

  try {
    const client = await pool.connect(); // Connect to the database
    const res = await client.query('SELECT * FROM my_table'); // Query to fetch all data from 'my_table'
    data = res.rows; // Store the result in the 'data' variable
    client.release(); // Release the database connection back to the pool
  } catch (err) {
    console.error('Error fetching data:', err); // Log any errors that occur
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">My Main Page</h1>
      <div className="w-full max-w-md">
        {/* Map over the data array and display each item */}
        {data.map((item) => (
          <div key={item.id} className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">ID: {item.id}</h2>
            <p>Description: {item.description}</p>
            <p>Category: {item.category}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
