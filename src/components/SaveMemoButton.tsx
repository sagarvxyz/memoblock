import { MemoWithIdeaAndBlocks } from '@/types';
import { Block, Memo } from '@prisma/client';
import { useRouter } from 'next/router';

export default function SaveMemoButton({
  activeMemo,
  blocks,
}: {
  activeMemo: MemoWithIdeaAndBlocks | Record<string, never>;
  blocks: Block[];
}) {
  const router = useRouter();
  const { id } = router.query;
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = JSON.parse(JSON.stringify(activeMemo));
    body.blocks = JSON.parse(JSON.stringify(blocks));
    // post the memo to the existing memo.
    const res = await fetch(`/api/memos/${id}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    const url = `/memos/${data.id}`;
    router.push(url);
  };
  return <button onClick={handleClick}>Save</button>;
}
