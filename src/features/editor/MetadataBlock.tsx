import { MetadataModel, MetadataStatus } from '@/common/types';
import { Dispatch, SetStateAction } from 'react';

export function MetadataBlock({
  metadata,
  setMetadata,
}: {
  metadata: MetadataModel;
  setMetadata: Dispatch<SetStateAction<MetadataModel>>;
}) {
  const metadataClone: typeof metadata = JSON.parse(JSON.stringify(metadata));
  return (
    <div className="MetadataBlock">
      <input
        className="MetadataTitle"
        onChange={(e) =>
          setMetadata({ ...metadataClone, title: e.target.value })
        }
        defaultValue={metadata.title}
      />
      <select
        className="MetadataStatus"
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
    </div>
  );
}
