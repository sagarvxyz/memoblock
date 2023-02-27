import EditButton from '@/components/EditButton';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

export default function MemoPage() {
  // Fetch memo and cache on page load.
  const router = useRouter();
  const { id } = router.query;
  const fetchMemo = async () => {
    const res = await fetch(`/api/memos/${id}`);
    return res.json();
  };
  const { data, isLoading } = useQuery(['memo', id], fetchMemo);
  console.log(data);
  let markdown = '';
  if (!isLoading) {
    markdown += `# ${data.metadata.title}  `;
    data.blocks.map((block) => (markdown += `${block.content}  `));
  }

  return (
    <>
      <EditButton />
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
}
