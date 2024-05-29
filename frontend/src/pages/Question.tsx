import React, { useEffect, useState } from "react";
import "./Question.css";
import Header from "../components/Header";
import MarkdownRenderer from "../components/MarkdownRenderer";
import Answer from "../components/Answer";
import upVote from "../assets/upVoteButton.svg";
import AnimatedUpVote from "../components/AnimatedUpVote";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";

interface Question {
  idQuest: string;
  idUser: string;
  title: string;
  description: string;
  context: string;
}

const Question: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [answers, setAnswers] = useState<any[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [user, setUser] = useState();
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
      console.log("LALALALA", typeof question.idUser);
    }
  }, [question]);

  return (
    <div>
      <Header />
      <div className="questionPage">
        <div className="upVote">
          <AnimatedUpVote voteCount={1} />
        </div>

        <div className="questionHeader">
          <div className="avatarAndUsername">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
              className="avatarQuestion"
            />
            <p className="username">Username</p>
          </div>
          <div className="date">
            <p>Posted on: 2021-09-01</p>
          </div>
        </div>
        <div className="questionContainer">
          <h1>How to center a div in CSS?</h1>
          <div className="questionDescription">
            <h2>Description:</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
          <div className="questionContext">
            <MarkdownRenderer markdownSource={markdownContent} />
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
