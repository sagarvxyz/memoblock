import MemoList from '@/components/MemoList';
import NewMemoButton from '@/components/NewMemoButton';
import { Memo } from '@prisma/client';
import { useEffect, useState } from 'react';
import { MemoWithIdeaAndBlocks } from '../api/memos/new';

export default function Memos({
  memos,
  setMemos,
}: {
  memos: MemoWithIdeaAndBlocks[];
  setMemos: React.Dispatch<React.SetStateAction<MemoWithIdeaAndBlocks[]>>;
}) {
  useEffect(() => {
    async function fetchData(url: string) {
      const res = await fetch(url);
      const data = await res.json();
      setMemos(data);
    }
    fetchData('/api/memos/latest');
  }, [setMemos]);
  return (
    <main>
      <h2>Memos Page</h2>
      <MemoList memos={memos} />
      <NewMemoButton memos={memos} setMemos={setMemos} />
    </main>
  );
}
