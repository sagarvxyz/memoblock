import { MemoModel, MemoWithBlocksAndIdea } from '@/common/types';
import { MemoEditor } from '@/features/editor/Editor';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Editor() {
  const router = useRouter();
  const { id } = router.query;
  const query = useQueryClient();
  const memo = query.getQueryData<MemoWithBlocksAndIdea>(['memo', id]);
  if (!memo) {
    return <div>Error</div>;
  }
  return <MemoEditor memo={memo} />;
}
