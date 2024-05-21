import React, { useEffect, useRef, useState } from "react";
import SimpleMDE from "simplemde";
import { marked, MarkedOptions } from "marked"; // Import MarkedOptions from "marked"
import "simplemde/dist/simplemde.min.css";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "./MarkdownEditor.css";

interface MarkdownEditorProps {}

const MarkdownEditor: React.FC<MarkdownEditorProps> = () => {
  const [markdownText, setMarkdownText] = useState<string>("");
  const [markedUpText, setMarkedUpText] = useState<string>("");
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const simplemde = new SimpleMDE({
        element: editorRef.current,
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
          {
            name: "code",
            action: () => {
              // Insert code block at the current cursor position
              if (simplemde.codemirror) {
                const cm = simplemde.codemirror;
                const cursorPos = cm.getCursor();
                cm.replaceRange("\n```language\nCode here\n```\n", cursorPos);
              }
            },
            className: "fa fa-code",
            title: "Insert Code",
          },
          "|",
          "preview",
          "side-by-side",
          "fullscreen",
        ],
      });

      simplemde.codemirror.on("change", () => {
        const value = simplemde.value();
        setMarkdownText(value);
      });
    }
  }, []);

useEffect(() => {
    const updateMarkedUpText = async () => {
        const content = await marked(markdownText, {
            highlight: (code: string, lang: string) => {
                const language = Prism.languages[lang] || Prism.languages.markup;
                return Prism.highlight(code, language, lang);
            },
        } as MarkedOptions);
        setMarkedUpText(content);
    };

    updateMarkedUpText();
}, [markdownText]);

  return (
    <div>
      <textarea ref={editorRef} title="Markdown Editor" />
      <div dangerouslySetInnerHTML={{ __html: markedUpText }} />
    </div>
  );
};

export default MarkdownEditor;
