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
    const data = JSON.parse(JSON.stringify(activeMemo));
    data.blocks = JSON.parse(JSON.stringify(blocks));
    // post the memo to the existing memo.
    const res = await fetch(`/api/memos/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const url = `/memos/${id}`;
    router.push(url);
  };
  return <button onClick={handleClick}>Save</button>;
}
