import React from "react";
import "./QuestionComp.css";
import { Link } from "react-router-dom";
import upVoteLogo from "../assets/upVoteButton.svg";
import AnimatedUpVote from "./AnimatedUpVote";

interface QuestionProps {
  idQuest: string;
  title: string;
  description: string;
  username: string;
  status: boolean;
  tags: string[];
}

<<<<<<< HEAD
const QuestionComp: React.FC<QuestionProps> = ({
  idQuest,
  title,
  description,
  username,
  tags,
}) => {
  return (
    <div key={idQuest} className="questionItem">
      <AnimatedUpVote />
      <div className="textRightPart">
        <div className="questionTop">
          <Link to={`/question/${idQuest}`} className="tilte">
            {title}
          </Link>
          <Link to={`/question/${idQuest}`} className="seeMoreLink">
            See more ...
          </Link>
=======
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
>>>>>>> cd9ab8e77d31dde51cdb18757665a40cd53d34b0
        </div>

        <p className="description">{description}</p>
        <div className="questionBottom">
          <div className="tags">
            {tags &&
              tags.map((tag, index) => (
                <p key={index} className="tagQComp">
                  {tag}
                </p>
              ))}
          </div>
<<<<<<< HEAD
          <p className="postedBy">Posted by: {username}</p>
=======
          <p>Posted by: {username}</p>
          {status && <p className='status'>Active</p>}
>>>>>>> cd9ab8e77d31dde51cdb18757665a40cd53d34b0
        </div>
      </div>
    </div>
  );
};

export default QuestionComp;
