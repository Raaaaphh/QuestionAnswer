import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {jwtDecode} from 'jwt-decode';
import Header from '../components/Header';
import QuestionComp from '../components/QuestionComp';
import './Report.css';

interface MyJwtPayload {
    id: string;
    exp: number;
  }

const Report = () => {
    const [reportedQuestions, setReportedQuestions] = useState([]);
    const [userStatus, setUserStatus] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode<MyJwtPayload>(token);;
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp > currentTime) {
                    setIsLoggedIn(true);
                    const idUser = decodedToken.id;
                    axiosInstance.get(`/users/${idUser}`)
                        .then(response => {
                            setUserStatus(response.data.role);
                        })
                        .catch(error => {
                            console.error("Error fetching user status", error);
                        });
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
    }, []);

    useEffect(() => {
        if (isLoggedIn && userStatus === "Lecturer") {
            fetchQuestionsFromDatabase();
        }
    }, [isLoggedIn, userStatus]);

    const fetchQuestionsFromDatabase = async () => {
        try {
            const response = await axiosInstance.get("questions");
            setReportedQuestions(response.data);
            console.log("Reported Questions fetched from database:", response.data);
        } catch (error) {
            console.error("Error fetching reported questions from database:", error);
        }
    };

    return (
        <div>
            <Header />
            {isLoggedIn && userStatus === "Lecturer" ? (
                <div className="reportContainer">
                    <h2 className="sectionTitle">Reported Questions</h2>
                    <div className="questionsContainer">
                        {reportedQuestions.map((question: any) => (
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
            ) : (
                <p>You are not authorized to view this page</p>
            )}
        </div>
    );
};

export default Report;
