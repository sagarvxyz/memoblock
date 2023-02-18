import { useRouter } from 'next/router';

export default function SaveButton({ editorText }: { editorText: string }) {
  const router = useRouter();
  const { id } = router.query;
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // e.preventDefault();
    const res = await fetch(`/api/memos/${id}`, {
      method: 'POST',
      body: JSON.stringify(editorText),
    });
    const url = `/memos/${id}`;
    router.push(url);
  };
  return (
    <button className="SaveButton" onClick={handleClick}>
      Save
    </button>
  );
}
