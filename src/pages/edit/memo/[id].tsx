import MemoEditor from '@/components/MemoEditor';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Editor() {
  const router = useRouter();
  const { id } = router.query;
  const query = useQueryClient();
  const memo = query.getQueryData(['memo', id]);
  return <MemoEditor memo={memo} />;
}
