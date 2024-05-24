import React, { useEffect, useState } from "react";
import { marked, MarkedOptions } from "marked"; // Import MarkedOptions from "marked"
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";

interface MarkdownRendererProps {
  markdownSource: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownSource }) => {
  const [markedUpText, setMarkedUpText] = useState<string>("");

  useEffect(() => {
    const updateMarkedUpText = async () => {
      const content = await marked(markdownSource, {
        highlight: (code: string, lang: string) => {
          const language = Prism.languages[lang] || Prism.languages.markup;
          return Prism.highlight(code, language, lang);
        },
      } as MarkedOptions);
      setMarkedUpText(content);
    };

    updateMarkedUpText();
  }, [markdownSource]);

  return <div dangerouslySetInnerHTML={{ __html: markedUpText }} />;
};

export default MarkdownRenderer;
