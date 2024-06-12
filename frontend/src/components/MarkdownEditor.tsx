import React, { useState, useEffect, useRef, useCallback } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./MarkdownEditor.css";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value: externalValue, onChange }) => {
  const simpleMDERef = useRef<SimpleMDE | null>(null);
  const [initialized, setInitialized] = useState(false);
  const valueRef = useRef(externalValue);

  const handleMarkdownChange = useCallback(() => {
    if (simpleMDERef.current) {
      const newValue = simpleMDERef.current.value();
      valueRef.current = newValue;
      onChange(newValue);
    }
  }, [onChange, valueRef]);

  const handleEditorInstance = useCallback((instance: SimpleMDE) => {
    simpleMDERef.current = instance;
    instance.codemirror.on('change', handleMarkdownChange);
  }, []);

  useEffect(() => {
    if (simpleMDERef.current && !initialized) {
      simpleMDERef.current.value(externalValue);
      setInitialized(true);
    }
  }, [externalValue, initialized, simpleMDERef]);

  const initialValue = valueRef.current;

  return (
    <div className="markdown-editor">
      <SimpleMDE
        ref={null}
        getMdeInstance={handleEditorInstance}
        options={{
          initialValue,
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
      />
    </div>
  );
};

export default MarkdownEditor;
