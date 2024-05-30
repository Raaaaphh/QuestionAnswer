import React, { useEffect, useState } from "react";
import "./Question.css";
import Header from "../components/Header";
import MarkdownRenderer from "../components/MarkdownRenderer";
import Answer from "../components/Answer";
import AnimatedUpVote from "../components/AnimatedUpVote";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { use } from "marked";

interface Question {
  idQuest: string;
  idUser: string;
  title: string;
  description: string;
  context: string;
  updatedAt: string;
  votes: number;
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

const Question: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [answers, setAnswers] = useState<any[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { idQuest } = useParams<{ idQuest: string }>();

  const fetchQuestionsFromDatabase = async () => {
    try {
      const response = await axiosInstance.get(`questions/${idQuest}`);
      setQuestion(response.data);
      console.log("Question fetched from database:", response.data);
    } catch (error) {
      console.error("Error fetching questions from database:", error);
    }
  };

  const fetchUserFromDatabase = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`users/${userId}`);
      setUser(response.data);
      console.log("User fetched from database:", user);
    } catch (error) {
      console.error("Error fetching user from database:", error);
    }
  };

  const fetchAnswersFromDatabase = async (idQuestion: string) => {
    try {
      const response = await axiosInstance.get(
        `answers/findByQuestion/${idQuestion}`
      );
      setAnswers(response.data);
      console.log("Answers fetched from database:", response.data);
    } catch (error) {
      console.error("Error fetching answers from database:", error);
    }
  };

  useEffect(() => {
    const fetchQuestionsAndUser = async () => {
      await fetchQuestionsFromDatabase();
      if (question && question.idUser) {
        fetchUserFromDatabase(question.idUser);
      }
    };

    fetchQuestionsAndUser();
  }, [idQuest]);

  useEffect(() => {
    if (question && question.idUser) {
      fetchUserFromDatabase(question.idUser);
    }
  }, [question]);

  useEffect(() => {
    console.log("LALALA:", idQuest);
    if (question && question.idQuest) {
      fetchAnswersFromDatabase(question.idQuest);
    }
  }, [idQuest]);

  return (
    <div>
      <Header />

      <div className="questionPage">
        <div className="upVote">
          <p>Votes: {question ? question.votes : "Loading..."}</p>
          <AnimatedUpVote voteCount={question ? question.votes : 0} />
        </div>

        <div className="questionHeader">
          <div className="avatarAndUsername">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
              className="avatarQuestion"
            />
            <p className="username">{user ? user.name : "Loading..."}</p>
          </div>

          <div className="date">
            <p>Posted on: {question ? question.updatedAt : "Loading..."}</p>
          </div>
        </div>
        <div className="questionContainer">
          <h1>{question ? question.title : "Loading..."}</h1>
          <div className="questionDescription">
            <h2>Description:</h2>
            <p>
              {question ? (
                <MarkdownRenderer markdownSource={question.description} />
              ) : (
                "Loading..."
              )}
            </p>
          </div>
          <div className="questionContext">
            <h2>Context:</h2>
            <p>
              {question ? (
                <MarkdownRenderer markdownSource={question.context} />
              ) : (
                "Loading..."
              )}
            </p>
          </div>
        </div>

        <div className="answersSection">
          {answers.map((answer) => (
            <Answer key={answer.idAnsw} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
