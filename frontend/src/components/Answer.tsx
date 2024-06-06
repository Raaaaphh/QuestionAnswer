import React, { useEffect, useState } from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import "./Answer.css";
import { useParams } from "react-router-dom";
import { use } from "marked";
import axiosInstance from "../utils/axiosInstance";

interface AnswerProps {
  answer: {
    idUser: string;
    content: string;
  };
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

const Answer: React.FC<AnswerProps> = ({ answer }) => {
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
    <div className="answerContainer">
      <div className="answerHeader">
        <p className="username">{user ? user.name : "Loading..."}</p>
      </div>
      <div className="answerContent">
        <MarkdownRenderer markdownSource={answer.content} />
      </div>
    </div>
  );
};

export default Answer;
