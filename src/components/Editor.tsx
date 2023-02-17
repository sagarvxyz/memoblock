import { useState } from 'react';

export default function Editor({}) {
  const [editorText, setEditorText] = useState('');
  const handleClick = () => {
    console.log('should POST editor text to db and update memo');
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setEditorText(e.target.value);
  };
  return (
    <main>
      <button onClick={handleClick}>Save</button>
      <textarea className="Editor" onChange={handleChange}>
        {editorText}
      </textarea>
    </main>
  );
}
