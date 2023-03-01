import { MemoModel } from '@/common/types';
import { useRouter } from 'next/router';
import { MouseEvent, SetStateAction, useEffect, useState } from 'react';

export function MemoListButton({
  memo,
}: {
  memo: Pick<MemoModel, 'id' | 'metadata'>;
}) {
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
