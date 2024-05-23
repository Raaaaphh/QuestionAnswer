import React from 'react';
import './QuestionComp.css';
import { Link } from 'react-router-dom';

interface QuestionProps {
  idQuest: number;
  title: string;
  description: string;
  username: string;
  status: string;
}

const Question: React.FC<QuestionProps> = ({ idQuest, title, description, username, status }) => {
  return (
    <div key={idQuest} className="questionItem">
      <div className="questionTop">
      <h3>{title}</h3>
      <Link to={`/question/${idQuest}`} className="seeMoreLink">See more ...</Link>
      </div>
      <p>{description}</p>
      <p>Posted by: {username}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default Question;
