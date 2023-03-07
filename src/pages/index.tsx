import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h2>Admin Page</h2>
      <Link className="AdminButton" href="/memos">
        Memos
      </Link>
    </main>
  );
}
