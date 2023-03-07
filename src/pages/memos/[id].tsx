import { MemoWithBlocksAndIdea } from '@/common/types';
import { EditButton } from '@/features/nav/MemoEditButton';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import styles from './memos.module.css';

export default function MemoPage() {
  // Fetch memo and cache on page load.
  const router = useRouter();
  const { id } = router.query;
  const fetchMemo = async () => {
    const res = await fetch(`/api/memos/${id}`);
    return res.json();
  };
  const { data, isLoading } = useQuery<MemoWithBlocksAndIdea>(
    ['memo', id],
    fetchMemo
  );
  let markdown = '';
  if (!isLoading && data) {
    markdown += `# ${data.metadata.title}  \n`;
    data.blocks.map((block) => (markdown += `${block.content}  \n`));
  }

  return (
    <section className={styles.section}>
      <EditButton />
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  );
}
