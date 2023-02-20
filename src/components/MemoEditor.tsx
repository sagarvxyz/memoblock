import { MemoWithIdeaAndBlocks } from '@/types';
import { Block } from '@prisma/client';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import BlockEditor from './BlockEditor';
import SaveMemoButton from './SaveMemoButton';
import SaveButton from './SaveMemoButton';

export default function MemoEditor() {
  const router = useRouter();
  const { id } = router.query;
  // fetch memo data
  const [activeMemo, setActiveMemo] = useState<
    MemoWithIdeaAndBlocks | Record<string, never>
  >({});
  const [blocks, setBlocks] = useState<Block[]>([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/memos/${id}`);
      const data = await res.json();
      setActiveMemo(data);
      setBlocks(data.blocks);
    }
    fetchData();
  }, [id]);
  return (
    <main>
      <SaveMemoButton activeMemo={activeMemo} blocks={blocks} />
      {blocks.map((block) => (
        <BlockEditor
          key={block.id}
          id={block.id}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      ))}
    </main>
  );
}
