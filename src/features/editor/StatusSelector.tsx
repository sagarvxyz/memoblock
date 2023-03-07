import { MetadataModel, MetadataStatus } from '@/common/types';
import { Dispatch, SetStateAction } from 'react';
import styles from './Editor.module.css';
export default function StatusSelector({
  metadata,
  setMetadata,
}: {
  metadata: MetadataModel;
  setMetadata: Dispatch<SetStateAction<MetadataModel>>;
}) {
  const metadataClone: typeof metadata = JSON.parse(JSON.stringify(metadata));
  return (
    <select
      className={styles.status}
      onChange={(e) => {
        let input = e.target.value;
        let isValid = (input: string): input is MetadataStatus =>
          ['draft', 'outline', 'live'].includes(input);
        let status = isValid(input) ? input : metadata.status;
        return setMetadata({ ...metadataClone, status });
      }}
      defaultValue={metadata.status}
    >
      <option value="outline">outline</option>
      <option value="draft">draft</option>
      <option value="live">live</option>
    </select>
  );
}
