import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {jwtDecode} from "jwt-decode";
import Header from "../components/Header";
import QuestionComp from "../components/QuestionComp";
import "./Report.css";

interface MyJwtPayload {
  id: string;
  exp: number;
}

const Report = () => {
  const [reportedQuestions, setReportedQuestions] = useState([]);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode<MyJwtPayload>(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
            setIsLoggedIn(true);
            const idUser = decodedToken.id;
            const userResponse = await axiosInstance.get(`/users/${idUser}`);
            setUserStatus(userResponse.data.role);

            if (userResponse.data.role === "Lecturer") {
              fetchQuestionsFromDatabase();
            }
          } else {
            console.log("Token has expired");
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error decoding token", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    const fetchQuestionsFromDatabase = async () => {
      try {
        const response = await axiosInstance.get("/questions/findReported/params?limit=20");
        setReportedQuestions(response.data);
        console.log("Reported Questions fetched from database:", response.data);
      } catch (error) {
        console.error("Error fetching reported questions from database:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Header />
      <div className="mainContainer">
        {isLoggedIn && userStatus === "Lecturer" ? (
          <div className="reportContainer">
            <h2 className="sectionTitle">Reported Questions</h2>
            <div className="questionsContainer">
              {reportedQuestions.map((question: any) => (
                <QuestionComp key={question.idQuest} idQuest={question.idQuest} reportDisplay={true} />
              ))}
            </div>
          </div>
        ) : (
          <p>You are not authorized to view this page</p>
        )}
      </div>
    </div>
  );
};

export default Report;
