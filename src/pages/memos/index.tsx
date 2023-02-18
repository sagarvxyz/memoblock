import MemoListDisplay from '@/components/MemoListDisplay';
import NewMemoButton from '@/components/NewMemoButton';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MemoMetadata } from '../api/memos';
import { MemoWithIdeaAndBlocks } from '../api/memos/new';

export default function MemoListPage({
  setActiveMemo,
}: {
  setActiveMemo: Dispatch<SetStateAction<MemoWithIdeaAndBlocks>>;
}) {
  const [list, setList] = useState<MemoMetadata[] | []>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/memos');
      const data = await res.json();
      setList(data);
    }
    fetchData();
  }, []);
  return (
    <main>
      <h2>Memos</h2>
      <MemoListDisplay list={list} />
      <NewMemoButton />
    </main>
  );
}
