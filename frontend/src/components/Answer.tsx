import React from "react";
import MarkdownRenderer from '../components/MarkdownRenderer';
import './Answer.css';

interface AnswerProps {
  answer: {
    idAnsw: string;
    idUser: string;
    content: string;
    final: boolean;
  };
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  return (
    <div className='answerContainer'>
      <div className='answerHeader'>
        <p className='username'>{answer.idUser}</p>
      </div>
      <div className='answerContent'>
        <MarkdownRenderer markdownSource={answer.content} />
      </div>
    </div>
  );
};

export default Answer;
