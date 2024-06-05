import React, { useEffect, useState } from "react";
import "./QuestionComp.css";
import { Link } from "react-router-dom";
import upVoteLogo from "../assets/upVoteButton.svg";
import axiosInstance from "../utils/axiosInstance";
import AnimatedUpVote from "./AnimatedUpVote";
import { stripVTControlCharacters } from "util";

interface QuestionProps {
  idQuest: string;
  title: string;
  description: string;
  status: boolean;
  votes: number;
}

const QuestionComp: React.FC<QuestionProps> = ({
  idQuest,
  title,
  description,
  status,
  votes,
}) => {
  const [question, setQuestion] = useState<{ idUser: string } | null>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [tags, setTags] = useState<string[]>([]);
  const [voteCount, setVoteCount] = useState<number>(votes);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const questionResponse = await axiosInstance.get(
          `/questions/${idQuest}`
        );
        setQuestion(questionResponse.data);

        const userId = questionResponse.data.idUser;
        setVoteCount(questionResponse.data.votes);

        const userResponse = await axiosInstance.get(`/users/${userId}`);
        setUser(userResponse.data);

        const questionTagsResponse = await axiosInstance.get(
          `/tags/${idQuest}`
        );
        setTags(questionTagsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [idQuest]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div key={idQuest} className="questionItem">
      <AnimatedUpVote voteCount={voteCount} />
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
          <p className="postedBy">Posted by: {user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionComp;
