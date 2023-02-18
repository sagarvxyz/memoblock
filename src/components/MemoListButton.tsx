import { MemoMetadata } from '@/pages/api/memos';
import { MemoWithIdeaAndBlocks } from '@/pages/api/memos/new';
import { useRouter } from 'next/router';
import { MouseEvent, SetStateAction, useEffect, useState } from 'react';

export default function MemoListButton({ memo }: { memo: MemoMetadata }) {
  const router = useRouter();
  const modifiedAt = new Date(memo.metadata.modifiedAt).toLocaleDateString();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push(`/memos/${memo.id}`);
  };

  return (
    <button onClick={handleClick}>
      <h3>{memo.metadata.title}</h3>
      <p>{memo.metadata.author}</p>
      <p>{modifiedAt}</p>
    </button>
  );
}
