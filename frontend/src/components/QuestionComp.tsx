import React, { useEffect, useState } from "react";
import "./QuestionComp.css";
import { Link } from "react-router-dom";
import upVoteLogo from "../assets/upVoteButton.svg";
import deleteLogo from "../assets/deleteButton.svg";
import keepLogo from "../assets/keepButton.svg";
import flagLogo from "../assets/flagLogo.svg";
import axiosInstance from "../utils/axiosInstance";
import AnimatedUpVote from "./AnimatedUpVote";
import jwtDecode from "jwt-decode";

interface QuestionProps {
  idQuest: string;
  reportDisplay: boolean;
}

const QuestionComp: React.FC<QuestionProps> = ({ idQuest, reportDisplay }) => {
  const [question, setQuestion] = useState<{
    idUser: string;
    title: string;
    description: string;
    context: string;
    votes: number;
    status: boolean;
  }>({
    idUser: '',
    title: '',
    description: '',
    context: '',
    votes: 0,
    status: false
  });
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const questionResponse = await axiosInstance.get(
          `/questions/${idQuest}`
        );
        setQuestion(questionResponse.data);

        const userId = questionResponse.data.idUser;

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

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/questions/${idQuest}`);
      console.log("Question deleted successfully");
    } catch (error) {
      console.error("Error deleting question", error);
    }
  };

  const handleKeep = async () => {
    try {
      await axiosInstance.post(`------------------------------------------------------`); // route to remove flag and innapropiate
      console.log("Question kept successfully");
    } catch (error) {
      console.error("Error keeping question", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div key={idQuest} className="questionItem">
      {reportDisplay === false && <AnimatedUpVote voteCount={question?.votes ?? 0} />}
      {reportDisplay ===true && 
      <div className="reportCount">
        <img src={flagLogo} alt="flag" className="flagLogo" />
        <p>{question?.votes}</p>
      </div>
      
      }
      
        
    
      <div className="textRightPart">
        <div className="questionTop">
          <Link to={`/question/${idQuest}`} className="title">
            {question?.title}
          </Link>
          <Link to={`/question/${idQuest}`} className="seeMoreLink">
            See more ...
          </Link>
        </div>

        <p className="description">{question.description}</p>
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
      {reportDisplay === true && 
      <div className="actionButtons">
          <img src={deleteLogo} alt="Delete" onClick={handleDelete} />
          <img src={keepLogo} alt="Keep" onClick={handleKeep} />
        </div>
      } 
    </div>
  );
};

export default QuestionComp;
