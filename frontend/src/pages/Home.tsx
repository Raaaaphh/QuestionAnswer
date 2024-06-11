import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import QuestionComp from "../components/QuestionComp";
import "./Home.css";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState({});
  const [filter, setFilter] = useState("topUnsolved");
  const [sectionTitle, setSectionTitle] = useState("Top Unsolved Questions");

  useEffect(() => {
    fetchQuestionsFromDatabase(filter);
    updateSectionTitle();
  }, [filter]);

  const fetchQuestionsFromDatabase = async (filter: string) => {
    try {
      let endpoint = "questions/findByFilter/params?filter=unsolved&limit=20";
      switch (filter) {
        case "topUnsolved":
          endpoint = "questions/findByFilter/params?filter=unsolved&limit=20";
          break;
        case "topSolved":
          endpoint = "questions/findByFilter/params?filter=solved&limit=20";
          break;
        case "mostRecent":
          endpoint = "questions/all/params?limit=20";
          break;
      }
      const response = await axiosInstance.get(endpoint);
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
              <QuestionComp idQuest={question.idQuest} reportDisplay={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
