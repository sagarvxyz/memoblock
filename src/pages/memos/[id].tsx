import Editor from '@/components/Editor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Memo({ memos, editorText, setEditorText }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const memo = memos.filter((memo) => memo.id === id)[0];
  let markdownText = '';
  memo.blocks.forEach((block) => (markdownText += `${block.content}  `));
  const handleClick = () => {
    setEditorText(markdownText);
    if (isEditMode) {
      console.log('post updated memo');
    }
    setIsEditMode(true);
  };
  if (isEditMode === false) {
    return (
      <main>
        <button onClick={handleClick}>Edit</button>
        <div className="MemoDisplay">
          <h2>{memo.metadata.title}</h2>
          {memo.blocks.map((block) => (
            <p key={block.id}>{block.content}</p>
          ))}
        </div>
      </main>
    );
  } else {
    return (
      <Editor
        memo={memo}
        editorText={editorText}
        setEditorText={setEditorText}
        setIsEditMode={setIsEditMode}
      />
    );
  }
}
