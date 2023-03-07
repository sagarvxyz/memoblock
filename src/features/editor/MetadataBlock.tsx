import { MetadataModel, MetadataStatus } from '@/common/types';
import { Dispatch, SetStateAction } from 'react';
import styles from './Editor.module.css';

export function MetadataBlock({
  metadata,
  setMetadata,
}: {
  metadata: MetadataModel;
  setMetadata: Dispatch<SetStateAction<MetadataModel>>;
}) {
  const metadataClone: typeof metadata = JSON.parse(JSON.stringify(metadata));
  return (
    <>
      <input
        className={styles.title}
        onChange={(e) =>
          setMetadata({ ...metadataClone, title: e.target.value })
        }
        defaultValue={metadata.title}
      />
    </>
  );
}
