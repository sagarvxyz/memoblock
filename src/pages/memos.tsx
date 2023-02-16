import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Memos({ memos, setMemos }) {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/memos/latest');
      const data = await res.json();
      setMemos(data);
    }
    fetchData();
  }, []);
  return (
    <main>
      <h2>Memos Page</h2>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <Link href={`/memos/${memo.id}`}>{memo.metadata.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
