import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./MarkdownEditor.css";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const [markdownText, setMarkdownText] = useState<string>(value);
  const [editorKey, setEditorKey] = useState<number>(0); // Key for re-rendering SimpleMDE

  useEffect(() => {
    setMarkdownText(value);
  }, [value]);

  const handleMarkdownChange = (newValue: string) => {
    setMarkdownText(newValue);
    onChange(newValue);
  };

  const resetEditor = () => {
    // Increment the editor key to force re-rendering SimpleMDE
    setEditorKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="markdown-editor">
      <SimpleMDE
        key={editorKey} // Re-render SimpleMDE when the key changes
        value={markdownText}
        onChange={handleMarkdownChange}
        options={{
          spellChecker: false,
          toolbar: [
            "bold",
            "italic",
            "heading",
            "|",
            "quote",
            "unordered-list",
            "ordered-list",
            "|",
            "link",
            "image",
            "|",
            "code",
            "|",
            "preview",
            "side-by-side",
            "fullscreen",
          ],
        }}
        onBlur={resetEditor} // Reset editor on blur to prevent focus issues
      />
      <div className="markdown-preview">
        <ReactMarkdown children={markdownText} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
