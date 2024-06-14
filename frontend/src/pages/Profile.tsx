import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Profile.css";
import QuestionComp from "../components/QuestionComp";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";
import ProfilePicture from "../components/ProfilePicture";
import TagCreationPopup from "../components/TagCreationPopup";
import UserSearchPopup from "../components/UserSearchPopup"; // Import the new component
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
  const navigate = useNavigate(); // Initialize navigate
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
  const [isUserSearchPopupOpen, setIsUserSearchPopupOpen] = useState(false); // New state for user search popup
  const [tags, setTags] = useState<Tag[]>([]);
  const [existingTags, setExistingTags] = useState<string[]>([]);

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
        console.log("User color", userResponse.data.color);
        const previousQuestions = await axiosInstance.get(
          `/questions/findByUser/${userId}`
        );
        setQuestions(previousQuestions.data);

        const favoritesQuestions = await axiosInstance.get(
          `/favorites/${userId}`
        );
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
    axiosInstance.get("/tags").then((response) => {
      setTags(response.data);
    });
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
      <div className="returnButtonContainer">
        <ReturnButton />
      </div>
      <div className="profileContainer">
        
        {user ? (
          <div className="profileSection">
            <div className="userInfos">
              <div className="avatarUsername">
                <div className="profilePicture">
                  <ProfilePicture userId={user.idUser} />
                </div>
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
                {/* Buttons to change password and name */}
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
                    <button
                      onClick={() => setIsUserSearchPopupOpen(true)} // Open user search popup
                      className="simpleButton"
                    >
                      Search User
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
      {isUserSearchPopupOpen && (
        <UserSearchPopup
          onClose={() => setIsUserSearchPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
