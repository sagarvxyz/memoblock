import {
  BlockModel,
  MemoWithBlocksAndIdea,
  MetadataModel,
} from '@/common/types';
import { useState } from 'react';
import { EditorBlock } from './EditorBlock';
import { EditorSaveButton } from './EditorSaveButton';
import { NewEditorBlock } from './editorTypes';
import { Block } from './blockClass';
import { MetadataBlock } from './MetadataBlock';

export function Editor({ memo }: { memo: MemoWithBlocksAndIdea }) {
  const [blocks, setBlocks] = useState<(BlockModel | NewEditorBlock)[]>(
    memo?.blocks || [new Block(0)]
  );
  const [metadata, setMetadata] = useState<MetadataModel>(memo?.metadata || {});

  return (
    <main>
      <EditorSaveButton memo={memo} blocks={blocks} metadata={metadata} />
      <h1>{memo?.metadata?.title ?? 'Untitled'}</h1>
      <MetadataBlock metadata={metadata} setMetadata={setMetadata} />
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
