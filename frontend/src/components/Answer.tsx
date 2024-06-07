import React, { useEffect, useState } from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import "./Answer.css";
import axiosInstance from "../utils/axiosInstance";
import BannerQuestion from "./BannerQuestion";

interface AnswerProps {
  answer: {
    idUser: string;
    content: string;
  };
  idAnswer: string;
}

interface User {
  idUser: string;
  name: string;
  email: string;
  password: string;
  confirmed: boolean;
  banned: boolean;
  color: string;
  createdAt: string;
  emailToken: string;
  role: string;
  updatedAt: string;
}

const Answer: React.FC<AnswerProps> = ({ answer, idAnswer }) => {
  console.log("ID Answer---------------:", idAnswer);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${answer.idUser}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [answer.idUser]);

  return (
    <div className="answerFull">
      {idAnswer && <BannerQuestion idQuestAns={idAnswer} isAnswer={true} />}
      <div className="answerContainer">
        
        <div className="answerContent">
          <MarkdownRenderer markdownSource={answer.content} />
        </div>
      </div>
    </div>
  );
};

export default Answer;
