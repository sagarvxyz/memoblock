import { useState } from 'react';

export default function Editor({
  memo,
  editorText,
  setEditorText,
  setIsEditMode,
}) {
  const handleClick = () => {
    setIsEditMode(false);
    console.log('should POST editor text to db and update memo');
  };
  const handleChange = (event) => {
    setEditorText(event.target.value);
  };
  return (
    <main>
      <button onClick={handleClick}>Save</button>
      <textarea className="Editor" onChange={(e) => handleChange(e)}>
        {editorText}
      </textarea>
    </main>
  );
}
