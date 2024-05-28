import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import QuestionComp from "../components/QuestionComp";
import "./Home.css";
import axiosInstance from "../utils/axiosInstance";

const mockQuestions = [
  {
    idQuest: 1,
    title: "How to solve a Rubik's Cube?",
    description:
      "I have been trying to solve a Rubik's Cube for a while now, but I can't seem to figure it out. I have watched numerous tutorials and read several guides, but I always get stuck at some point. The algorithms and sequences are quite confusing, and I often end up making things worse instead of better. I am looking for a step-by-step guide that can break down the process into simpler, more manageable parts. Maybe some tips on how to remember the different algorithms or any tricks that can help me get past the difficult stages would be really helpful. I would also love to hear about different methods, such as the beginner's method, the CFOP method, or any other methods that are considered effective. Any advice or resources that can make this process easier to understand and follow would be greatly appreciated.",
    user: {
      username: "PuzzleLover",
    },
    status: "unsolved",
    tags: ["Rubik's Cube", "Puzzle", "Logic", "Problem Solving"],
  },
];

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState({});
  const [filter, setFilter] = useState("topUnsolved");
  const [sectionTitle, setSectionTitle] = useState("Top Unsolved Questions");

  useEffect(() => {
    fetchQuestionsFromDatabase();
    updateSectionTitle();
  }, [filter]);

  const fetchQuestionsFromDatabase = async () => {
    try {
      const response = await axiosInstance.get("questions");
      setQuestions(response.data);
      console.log("Questions fetched from database:", response.data);
      console.log("Questions:", questions);
    } catch (error) {
      console.error("Error fetching questions from database:", error);
    }
  };

  const updateSectionTitle = () => {
    switch (filter) {
      case "topUnsolved":
        setSectionTitle("Top Unsolved Questions");
        break;
      case "topSolved":
        setSectionTitle("Top Solved Questions");
        break;
      case "mostRecent":
        setSectionTitle("Most Recent Questions");
        break;
      default:
        setSectionTitle("All Questions");
    }
  };

  const handleFilterChange = (newFilter: React.SetStateAction<string>) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Header />
      <div className="homeContainer">
        <div className="filterContainer">
          <h3>Filter:</h3>
          <div className="filterOptions">
            <button
              className={filter === "topUnsolved" ? "active" : ""}
              onClick={() => handleFilterChange("topUnsolved")}
            >
              Top Unsolved
            </button>
            <button
              className={filter === "topSolved" ? "active" : ""}
              onClick={() => handleFilterChange("topSolved")}
            >
              Top Solved
            </button>
            <button
              className={filter === "mostRecent" ? "active" : ""}
              onClick={() => handleFilterChange("mostRecent")}
            >
              Most Recent
            </button>
          </div>
        </div>
        <div className="sectionContainer">
          <h2 className="sectionTitle">{sectionTitle}</h2>
          <div className="questionsContainer">
            {questions.map((question: any) => (
              <QuestionComp
                key={question.idQuest}
                idQuest={question.idQuest}
                title={question.title}
                description={question.description}
                status={question.status}
                votes={question.votes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
