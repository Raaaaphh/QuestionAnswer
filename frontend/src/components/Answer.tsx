import React from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import "./Answer.css";

interface AnswerProps {
  answer: {
    idUser: string;
    content: string;
  };
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  return (
    <div className="answerContainer">
      <div className="answerHeader">
        <p className="username">{answer.idUser}</p>
      </div>
      <div className="answerContent">
        <MarkdownRenderer markdownSource={answer.content} />
      </div>
    </div>
  );
};

export default Answer;
