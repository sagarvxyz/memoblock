import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MouseEvent } from 'react';
import { BlockModel, MemoModel, MetadataModel } from '@/common/types';
import { NewEditorBlock } from './editorTypes';
import styles from './Editor.module.css';

export function SaveButton({
  memo,
  blocks,
  metadata,
}: {
  memo: MemoModel;
  blocks: (BlockModel | NewEditorBlock)[];
  metadata: MetadataModel;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;

  const fetchMemo = async (data: MemoModel) => {
    const body: MemoModel = JSON.parse(JSON.stringify(data));
    const res = await fetch(`/api/memos/${id}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return res.json();
  };
  let newId = '';
  const mutation = useMutation({
    mutationFn: fetchMemo,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['memo', data.id], data);
      const url = `/memos/${data.id}`;
      router.push(url);
    },
  });
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    const updatedMemo = {
      ...memo,
      blocks: blocks.map((block) => {
        return {
          ...block,
          metadata: {
            ...block.metadata,
            status: metadata.status,
          },
        };
      }),
      metadata: { ...metadata },
    };
    await mutation.mutate(updatedMemo);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Save
    </button>
  );
}
