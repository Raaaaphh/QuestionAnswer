import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Profile.css";
import QuestionComp from "../components/QuestionComp";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwtDecode
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export interface Question {
  idQuest: string;
  idUser: string;
  title: string;
  description: string;
  context: string;
  votes: number;
  flagsSpam: number;
  flagsInappropiate: number;
  status: boolean;
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    idUser: string;
  } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [favorites, setFavorites] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const decodedToken = jwtDecode(token) as { id: string };
        const userId = decodedToken.id;

        const userResponse = await axiosInstance.get(`/users/${userId}`);
        setUser(userResponse.data);

        const previousQuestions = await axiosInstance.get(`/questions/findByUser/${userId}`);
        setQuestions(previousQuestions.data);

        const favoritesQuestions = await axiosInstance.get(`/favorites/${userId}`);
        setFavorites(favoritesQuestions.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="profileContainer">
        {user ? (
          <div className="profileSection">
            <div className="userInfos">
              <div className="avatarUsername">
                <img src="" alt="avatar" className="avatar" />
                <h2>PROFILE</h2>
              </div>
              <div className="userDetails">
                <div className="userDetail">
                  <h3>First Name</h3>
                  <p>{user.name}</p>
                </div>
                <div className="userDetail">
                  <h3>Email</h3>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
            <div className="previousQuestions">
              <h3>Previous Questions</h3>
              <div className="questionsContainer">
                {questions.map((question) => (
                  <QuestionComp
                    key={question.idQuest}
                    idQuest={question.idQuest}
                    title={question.title}
                    description={question.description} // Pass the username prop
                    status={question.status}
                    votes={question.votes}
                  />
                ))}
              </div>
            </div>
            <div className="followedQuestions">
              <h3>Followed Questions</h3>
              <div className="questionsContainer">
                {favorites.map((question) => (
                  <QuestionComp
                    key={question.idQuest}
                    idQuest={question.idQuest}
                    title={question.title}
                    description={question.description} // Pass the username prop
                    status={question.status}
                    votes={question.votes}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
