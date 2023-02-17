import { Memo } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MemoWithIdeaAndBlocks } from '../api/memos/new';

export default function MemoPage({
  memos,
}: {
  memos: MemoWithIdeaAndBlocks[];
}) {
  const [blocks, setBlocks] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const activeMemo = memos.filter((memo) => memo.id === id)[0];
  const content = activeMemo.blocks.map((block) => (
    <p key={block.id}>{block.content}</p>
  ));
  return <div>{content}</div>;
}
