import React, { useEffect, useState } from "react";
import "./Question.css";
import Header from "../components/Header";
import MarkdownRenderer from "../components/MarkdownRenderer";
import Answer from "../components/Answer";
import AnimatedUpVote from "../components/AnimatedUpVote";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import BannerQuestion from "../components/BannerQuestion";
import flagLogo from "../assets/flagLogo.svg";
import returnArrow from "../assets/returnArrow.svg";

interface Question {
  idQuest: string;
  idUser: string;
  title: string;
  description: string;
  context: string;
  updatedAt: string;
  votes: number;
  status: string; // Changed to string
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionResponse = await axiosInstance.get(`questions/${idQuest}`);
        const fetchedQuestion = questionResponse.data;
        setQuestion(fetchedQuestion);

        if (fetchedQuestion.idUser) {
          const userResponse = await axiosInstance.get(`users/${fetchedQuestion.idUser}`);
          setUser(userResponse.data);
        }

        if (fetchedQuestion.idQuest) {
          const answersResponse = await axiosInstance.get(`answers/findByQuestion/${fetchedQuestion.idQuest}`);
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
      <div className="topInfos">
      <img src={returnArrow} alt="return arrow" />
      {question?.status === "Solved" && (
        <div className="status solved">
          Question solved!
        </div>
      )}
        <img src={flagLogo} alt="Flag logo" />
      </div>
      <div className="questionPage">
        <div className="upVote">
          <AnimatedUpVote voteCount={question ? question.votes : 0} />
        </div>
        {question && <BannerQuestion idQuestAns={question.idQuest} isAnswer={false} />}
        
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
          {answers.length === 0 ? (
            <p>No answers available.</p>
          ) : (
            answers.map((answer) => (
              <Answer key={answer.idAnsw} answer={answer} idAnswer={answer.idAnsw} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
