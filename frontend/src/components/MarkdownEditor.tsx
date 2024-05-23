import React, { useState, useEffect, useRef } from "react";
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
  const simpleMDERef = useRef<any>(null);

  useEffect(() => {
    setMarkdownText(value);
  }, [value]);

  const handleMarkdownChange = (newValue: string) => {
    setMarkdownText(newValue);
    onChange(newValue);
  };

  const resetEditor = () => {
    if (simpleMDERef.current && simpleMDERef.current.codemirror && !simpleMDERef.current.codemirror.hasFocus()) {
      simpleMDERef.current.codemirror.focus();
    }
  };

  return (
    <div className="markdown-editor">
     <SimpleMDE
      ref={simpleMDERef}
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
      onBlur={resetEditor}
    />
      <div className="markdown-preview">
        <ReactMarkdown children={markdownText} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
