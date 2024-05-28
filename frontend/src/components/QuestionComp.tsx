import React from 'react';
import './QuestionComp.css';
import { Link } from 'react-router-dom';
import upVoteLogo from '../assets/upVoteButton.svg';

interface QuestionProps {
  idQuest: string;
  title: string;
  description: string;
  username: string;
  status: boolean;
  tags: string[];
}

const QuestionComp: React.FC<QuestionProps> = ({ idQuest, title, description, username, status, tags }) => {
  
  return (
    <div key={idQuest} className="questionItem">
      <div className='voteSection'>
        <p>8</p> {/* Assuming static votes for now */}
        <img src={upVoteLogo} alt="upVoteLogo" />
      </div>
      <div className='textRightPart'>
        <div className="questionTop">
          <Link to={`/question/${idQuest}`} className="title">{title}</Link>
          <Link to={`/question/${idQuest}`} className="seeMoreLink">See more ...</Link>
        </div>
        
        <p className='description'>{description}</p>
        <div className='questionBottom'>
          <div className='tags'>
            {tags && tags.map((tag, index) => (
              <p key={index} className='tagQComp'>{tag}</p>
            ))}
          </div>
          <p>Posted by: {username}</p>
          {status && <p className='status'>Active</p>}
        </div>
      </div>
    </div>
  );
};

export default QuestionComp;
