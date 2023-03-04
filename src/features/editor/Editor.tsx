import { BlockModel, MemoWithBlocksAndIdea } from '@/common/types';
import { useState } from 'react';
import { EditorBlock } from './EditorBlock';
import { EditorSaveButton } from './EditorSaveButton';
import { NewEditorBlock } from './editorTypes';
import { Block } from './BlockClass';

export function Editor({ memo }: { memo: MemoWithBlocksAndIdea }) {
  const [blocks, setBlocks] = useState<(BlockModel | NewEditorBlock)[]>(
    memo?.blocks || []
  );
  if (!blocks.length) {
    setBlocks([...blocks, new Block(0)]);
  }

  return (
    <main>
      <EditorSaveButton memo={memo} blocks={blocks} />
      <h1>{memo?.metadata?.title ?? 'Untitled'}</h1>

      {blocks.map((block, i) => (
        <EditorBlock
          key={block.id}
          blockIndex={i}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      ))}
    </main>
  );
}
