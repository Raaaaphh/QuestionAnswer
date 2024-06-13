import React, { useEffect, useState } from "react";
import "./Profile.css";
import QuestionComp from "../components/QuestionComp";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import ProfilePicture from "../components/ProfilePicture";
import Header from "../components/Header";
import TagCreationPopup from "../components/TagCreationPopup";

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
  const [favorites, setFavorites] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTagPopupOpen, setIsTagPopupOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [existingTags, setExistingTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwtDecode<{ id: string }>(token);
        const userId = decodedToken.id;
        console.log("User ID:", userId);

        const userResponse = await axiosInstance.get(`/users/${userId}`);
        console.log("User Response:", userResponse.data);
        setUser(userResponse.data);

        const previousQuestions = await axiosInstance.get(
          `/questions/${userId}`
        );
        console.log("Previous Questions:", previousQuestions.data);
        console.log("TATA EN STRING", "TOTO EN SLIP");
        setQuestions(previousQuestions.data);

        const favoritesQuestions = await axiosInstance.get(
          `/favorites/findByUser/${userId}`
        );
        console.log("Favorites Questions:", favoritesQuestions.data);
        setFavorites(favoritesQuestions.data);
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
        const response = await axiosInstance.get("/tags");
        console.log("Tags:", response.data); // Vérifiez que les tags sont récupérés
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const newExistingTags = tags.map((tag) => tag.name);
    setExistingTags(newExistingTags);
  }, [tags]);

  const handleCreateTag = (tagName: string) => {
    console.log("New tag created:", tagName);
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
      <div className="profileContainer">
        {user ? (
          <div className="profileSection">
            <div className="userInfos">
              <div className="avatarUsername">
                <div className="profilePicture">
                  <ProfilePicture userId={user.idUser} />
                </div>
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
                  <button
                    onClick={handleChangePasswordClick}
                    className="simpleButton"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleChangeNameClick}
                    className="simpleButton"
                  >
                    Change Name
                  </button>
                </div>
                {user.role === "Lecturer" && (
                  <div className="buttonContainer">
                    <Link to="/reported" className="simpleButton">
                      Go to Report
                    </Link>
                    <button
                      onClick={() => setIsTagPopupOpen(true)}
                      className="simpleButton"
                    >
                      Create a tag
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="previousQuestions">
              <h3>Previous Questions</h3>
              <div className="questionsContainer">
                {questions.map((question) => (
                  <QuestionComp
                    key={question.idQuest}
                    idQuest={question.idQuest}
                    reportDisplay={false}
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
                    reportDisplay={false}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
      {isTagPopupOpen && (
        <TagCreationPopup
          onClose={() => setIsTagPopupOpen(false)}
          onSubmit={handleCreateTag}
          existingTags={existingTags}
        />
      )}
    </div>
  );
};

export default Profile;
