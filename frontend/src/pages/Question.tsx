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

interface Answer {
  idAnsw: string;
  idUser: string;
  idQuest: string;
  description: string;
  updatedAt: string;
}

const Question: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [answers, setAnswers] = useState<any[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { idQuest } = useParams<{ idQuest: string }>();

  // const fetchQuestionsFromDatabase = async () => {
  //   try {
  //     const response = await axiosInstance.get(`questions/${idQuest}`);
  //     setQuestion(response.data);
  //     console.log("Question fetched from database:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching questions from database:", error);
  //   }
  // };

  // const fetchUserFromDatabase = async (userId: string) => {
  //   try {
  //     const response = await axiosInstance.get(`users/${userId}`);
  //     setUser(response.data);
  //     console.log("User fetched from database:", user);
  //   } catch (error) {
  //     console.error("Error fetching user from database:", error);
  //   }
  // };

  // const fetchAnswersFromDatabase = async (idQuestion: string) => {
  //   try {
  //     console.log("idQuestion:", idQuestion);
  //     const response = await axiosInstance.get(
  //       `answers/findByQuestion/${idQuestion}`
  //     );
  //     setAnswers(response.data);
  //     console.log("Answers fetched from database:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching answers from database:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (question && question.idQuest) {
  //     fetchAnswersFromDatabase(question.idQuest);
  //   }
  // }, [idQuest]);

  // useEffect(() => {
  //   const fetchQuestionsAndUser = async () => {
  //     await fetchQuestionsFromDatabase();
  //     if (question && question.idUser) {
  //       fetchUserFromDatabase(question.idUser);
  //     }
  //   };

  //   fetchQuestionsAndUser();
  // }, [idQuest]);

  // useEffect(() => {
  //   if (question && question.idUser) {
  //     fetchUserFromDatabase(question.idUser);
  //   }
  // }, [question]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionResponse = await axiosInstance.get(
          `questions/${idQuest}`
        );
        const fetchedQuestion = questionResponse.data;
        setQuestion(fetchedQuestion);

        if (fetchedQuestion.idUser) {
          const userResponse = await axiosInstance.get(
            `users/${fetchedQuestion.idUser}`
          );
          setUser(userResponse.data);
        }

        if (fetchedQuestion.idQuest) {
          const answersResponse = await axiosInstance.get(
            `answers/findByQuestion/${fetchedQuestion.idQuest}`
          );
          setAnswers(answersResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data from database:", error);
      }
    };

    fetchData();
  }, [idQuest]);

  return (
    <div>
      <Header />

      <div className="questionPage">
        <div className="upVote">
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
              <div>
                {question ? (
                  <MarkdownRenderer markdownSource={question.description} />
                ) : (
                  "Loading..."
                )}
              </div>
            </p>
          </div>
          <div className="questionContext">
            <h2>Context:</h2>
            <p>
              <div>
                {question ? (
                  <MarkdownRenderer markdownSource={question.context} />
                ) : (
                  "Loading..."
                )}
              </div>
            </p>
          </div>
        </div>
        <div className="answersSection">
          {answers.length === 0 ? (
            <p>No answers available.</p>
          ) : (
            answers.map((answer) => (
              <Answer key={answer.idAnsw} answer={answer} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
