import React from "react";
import "./QuestionComp.css";
import { Link } from "react-router-dom";
import upVoteLogo from "../assets/upVoteButton.svg";
import AnimatedUpVote from "./AnimatedUpVote";

interface QuestionProps {
  idQuest: number;
  title: string;
  description: string;
  username: string;
  status: string;
  tags: string[];
}

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
          <p className="postedBy">Posted by: {username}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionComp;
