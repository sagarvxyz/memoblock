import EditButton from '@/components/EditButton';
import { Metadata } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MemoWithIdeaAndBlocks } from '@/types';

export default function MemoPage() {
  const [activeMemo, setActiveMemo] = useState<
    MemoWithIdeaAndBlocks | Record<string, never>
  >({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    async function fetchMemo(id: string) {
      const res = await fetch(`/api/memos/${id}`);
      const data = await res.json();
      const newMemo = JSON.parse(JSON.stringify(data));
      setActiveMemo(newMemo);
    }
    if (typeof id === 'string') {
      fetchMemo(id);
    }
  }, [id]);

  let markdown = '';
  if (Object.keys(activeMemo).length) {
    markdown += `# ${activeMemo.metadata.title}  `;
    activeMemo.blocks.map((block) => (markdown += `${block.content}  `));
  }

  return (
    <>
      <EditButton />
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
}
