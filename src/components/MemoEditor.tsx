import { EditorBlock } from '@/utils/EditorBlock';
import {
  BlockModel,
  MemoModel,
  MemoWithBlocksAndIdea,
  NewEditorBlock,
} from '@/utils/types';
import { useState } from 'react';
import BlockEditor from './BlockEditor';
import SaveMemoButton from './SaveMemoButton';

export default function MemoEditor({ memo }: { memo: MemoWithBlocksAndIdea }) {
  const [blocks, setBlocks] = useState<(BlockModel | NewEditorBlock)[]>(
    memo.blocks
  );
  if (!blocks.length) {
    setBlocks([...blocks, new EditorBlock(0)]);
  }

  return (
    <main>
      <SaveMemoButton memo={memo} blocks={blocks} />
      <h1>{memo.metadata.title}</h1>

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
