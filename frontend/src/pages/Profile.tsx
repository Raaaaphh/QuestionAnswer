import React, { useEffect, useState } from "react";
import "./Profile.css";
import QuestionComp from "../components/QuestionComp";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import {jwtDecode} from "jwt-decode";
import ProfilePicture from "../components/ProfilePicture";
import Header from "../components/Header";
import TagCreationPopup from "../components/TagCreationPopup";
import UserSearchPopup from "../components/UserSearchPopup";
import ReturnButton from "../components/ReturnButton";

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

interface Answer {
  idAnsw: string;
  idUser: string;
  idQuest: string;
  description: string;
  updatedAt: string;
}

type Tag = {
  idTag: string;
  idUser: string;
  name: string;
  description: string;
  occurrence: number;
  createdAt: string;
  updatedAt: string;
};

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    idUser: string;
    color: string;
    role: string;
  } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [favorites, setFavorites] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [isUserSearchPopupOpen, setIsUserSearchPopupOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [existingTags, setExistingTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const { id: userId } = jwtDecode<{ id: string }>(token);

        const { data: userData } = await axiosInstance.get(`/users/${userId}`);
        setUser(userData);

        if (userData.role === 'Student') {
          const { data: previousQuestions } = await axiosInstance.get(`/questions/getQuestionsForUser/${userId}`);
          setQuestions(previousQuestions);

          const { data: favoritesQuestions } = await axiosInstance.get(`/favorites/findByUser/${userId}`);
          setFavorites(favoritesQuestions);
        }

        if (userData.role === 'Lecturer') {
          const { data: previousAnswers } = await axiosInstance.get(`/answers/findByUser/${userId}`);
          const uniqueAnswers = previousAnswers.filter(
            (answer: Answer, index: number, self: Answer[]) =>
              index === self.findIndex((a) => a.idQuest === answer.idQuest)
          );
          setAnswers(uniqueAnswers);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data: tagsData } = await axiosInstance.get("/tags");
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching tags", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    setExistingTags(tags.map((tag) => tag.name));
  }, [tags]);

  const handleCreateTag = (tagName: string) => {
    setExistingTags((prevTags) => [...prevTags, tagName]);
  };

  const handleChangePasswordClick = () => {
    if (user) {
      navigate(`/profile/${user.idUser}/change-password`);
    } else {
      alert("User data is missing.");
    }
  };

  const handleChangeNameClick = () => {
    if (user) {
      navigate(`/profile/${user.idUser}/change-name`);
    } else {
      alert("User data is missing.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="returnButtonContainer">
        <ReturnButton />
      </div>
      <div className="profileContainer">
        {user ? (
          <div className="profileSection">
            <div className="userInfos">
              <div className="avatarUsername">
                <ProfilePicture userId={user.idUser} />
                <h2>{user.name}</h2>
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
                <div className="buttonContainer">
                  <button onClick={handleChangePasswordClick} className="simpleButton">
                    Change Password
                  </button>
                  <button onClick={handleChangeNameClick} className="simpleButton">
                    Change Name
                  </button>
                </div>
                {user.role === "Lecturer" && (
                  <div className="buttonContainer">
                    <Link to="/reported" className="simpleButton">
                      Go to Report
                    </Link>
                    <button onClick={() => setIsTagPopupOpen(true)} className="simpleButton">
                      Create a tag
                    </button>
                    <button onClick={() => setIsUserSearchPopupOpen(true)} className="simpleButton">
                      Search User
                    </button>
                  </div>
                )}
              </div>
            </div>
            {user.role === "Lecturer" && (
              <div className="previousQuestions">
                <h3>Previous Answers</h3>
                <div className="questionsContainer">
                  {answers.map((answer) => (
                    <QuestionComp key={answer.idAnsw} idQuest={answer.idQuest} reportDisplay={false} />
                  ))}
                </div>
              </div>
            )}
            {user.role === "Student" && (
              <div>
                <div className="previousQuestions">
                  <h3>Previous Questions</h3>
                  <div className="questionsContainer">
                    {questions.map((question) => (
                      <QuestionComp key={question.idQuest} idQuest={question.idQuest} reportDisplay={false} />
                    ))}
                  </div>
                </div>
                <div className="followedQuestions">
                  <h3>Followed Questions</h3>
                  <div className="questionsContainer">
                    {favorites.map((question) => (
                      <QuestionComp key={question.idQuest} idQuest={question.idQuest} reportDisplay={false} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
      {isTagPopupOpen && (
        <TagCreationPopup onClose={() => setIsTagPopupOpen(false)} onSubmit={handleCreateTag} existingTags={existingTags} />
      )}
      {isUserSearchPopupOpen && (
        <UserSearchPopup onClose={() => setIsUserSearchPopupOpen(false)} />
      )}
    </div>
  );
};

export default Profile;
