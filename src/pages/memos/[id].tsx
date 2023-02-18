import EditButton from '@/components/EditButton';
import { Memo } from '@prisma/client';
import { useRouter } from 'next/router';
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MemoWithIdeaAndBlocks } from '../api/memos/new';

export default function MemoPage({
  memos,
  setMemos,
  setEditorText,
}: {
  memos: MemoWithIdeaAndBlocks[];
  setMemos: React.Dispatch<SetStateAction<MemoWithIdeaAndBlocks[]>>;
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
  const { current: memoRef } = useRef(memos);
  useEffect(() => {
    const updatedMemos = memoRef.filter((memo) => memo.id !== id);
    async function fetchData() {
      const res = await fetch(`/api/memos/${id}`);
      const data = await res.json();

      updatedMemos.push(data);
      setMemos(updatedMemos);
    }
    fetchData();
  }, [id, memoRef, setMemos]);
  const activeMemo = memos.filter((memo) => memo.id === id)[0];
  const content = activeMemo.content;
  return (
    <>
      <EditButton memos={memos} />
      <div className="MemoContent">{content}</div>
    </>
  );
}
