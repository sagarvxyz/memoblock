import {
  BlockModel,
  MemoWithBlocksAndIdea,
  MetadataModel,
} from '@/common/types';
import { useState } from 'react';
import { TextBlock } from './TextBlock';
import { SaveButton } from './SaveButton';
import { NewEditorBlock } from './editorTypes';
import { Block } from './blockClass';
import { MetadataBlock } from './MetadataBlock';
import styles from './Editor.module.css';
import StatusSelector from './StatusSelector';

export function Editor({ memo }: { memo: MemoWithBlocksAndIdea }) {
  const [blocks, setBlocks] = useState<(BlockModel | NewEditorBlock)[]>(
    memo?.blocks || [new Block(0)]
  );
  const [metadata, setMetadata] = useState<MetadataModel>(memo?.metadata || {});

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <StatusSelector metadata={metadata} setMetadata={setMetadata} />
        <SaveButton memo={memo} blocks={blocks} metadata={metadata} />
      </div>
      <MetadataBlock metadata={metadata} setMetadata={setMetadata} />
      {blocks.map((block, i) => (
        <TextBlock
          key={block.id}
          blockIndex={i}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      ))}
    </section>
  );
}
