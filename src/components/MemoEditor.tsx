import { useState } from 'react';
import BlockEditor from './BlockEditor';
import SaveMemoButton from './SaveMemoButton';

export default function MemoEditor({ memo }: { memo: any }) {
  const [blocks, setBlocks] = useState(memo.blocks);
  return (
    <main>
      <SaveMemoButton memo={memo} blocks={blocks} />
      {blocks.map((block, i) => (
        <BlockEditor
          key={block.id}
          blockIndex={i}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      ))}
    </main>
  );
}
