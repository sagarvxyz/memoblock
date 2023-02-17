import Editor from '@/components/Editor';
import { Memo } from '@prisma/client';

export default function editor({
  memos,
  setMemos,
}: {
  memos: Memo[];
  setMemos: React.Dispatch<React.SetStateAction<Memo[]>>;
}) {
  return <Editor />;
}
