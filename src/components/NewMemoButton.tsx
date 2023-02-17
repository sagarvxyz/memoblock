import { MemoWithIdeaAndBlocks } from '@/pages/api/memos/new';
import { Memo } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

async function postNewMemo() {
  const res = await fetch('/api/memos/new', { method: 'POST' });
  const data = await res.json();
  const { id } = data;
  return data;
}

export default function NewMemoButton({
  memos,
  setMemos,
}: {
  memos: MemoWithIdeaAndBlocks[];
  setMemos: React.Dispatch<React.SetStateAction<MemoWithIdeaAndBlocks[]>>;
}) {
  const router = useRouter();
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // post an empty memo and get new ID
    const memo = await postNewMemo();
    setMemos([...memos, memo]);
    // redirect to editor
    const url = `/edit/memo/${memo.id}`;
    router.push(url);
  };

  return <button onClick={handleClick}>+</button>;
}
