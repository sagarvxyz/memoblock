import { MemoWithIdeaAndBlocks } from '@/pages/api/memos/new';
import { Block } from '@prisma/client';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import BlockEditor from './BlockEditor';
import SaveButton from './SaveButton';

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
      console.log(data);
      setActiveMemo(data);
      setBlocks(data.blocks);
    }
    fetchData();
  }, []);

  // create a block state object
  // render a block editor for each block, passing in the block state
  // render a saveMemo button that will:
  // save each changed block as a new block in the same block idea
  // save a new memo on the same memo id
  return (
    <main>
      {/* <SaveButton /> */}
      {blocks.map((block) => (
        <BlockEditor key={block.id} block={block} setBlocks={setBlocks} />
      ))}
    </main>
  );
}
