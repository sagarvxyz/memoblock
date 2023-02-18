import EditButton from '@/components/EditButton';
import { Memo } from '@prisma/client';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { MemoWithIdeaAndBlocks } from '../api/memos/new';

export default function MemoPage({
  memos,
  activeMemo,
  setActiveMemo,
  setEditorText,
}: {
  memos: MemoWithIdeaAndBlocks[];
  activeMemo: MemoWithIdeaAndBlocks;
  setActiveMemo: React.Dispatch<SetStateAction<MemoWithIdeaAndBlocks>>;
  setEditorText: React.Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const { id } = router.query;
  let memoId = '';
  if (typeof id === 'string') {
    memoId = id;
  } else if (Array.isArray(id)) {
    memoId = id[0];
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/memos/${id}`);
      const data = await res.json();
      setActiveMemo(data);
    }
    fetchData();
  }, [setActiveMemo, id]);

  const content = activeMemo.content;
  return (
    <>
      <EditButton id={memoId} memos={memos} setEditorText={setEditorText} />
      <div className="MemoContent">{content}</div>
    </>
  );
}
