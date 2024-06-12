import React, { useEffect, useState, useRef } from "react";
import "./Question.css";
import Header from "../components/Header";
import MarkdownRenderer from "../components/MarkdownRenderer";
// Removed MarkdownEditor import
import Answer from "../components/Answer";
import AnimatedUpVote from "../components/AnimatedUpVote";
import axiosInstance from "../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import BannerQuestion from "../components/BannerQuestion";
import flagLogo from "../assets/flagLogo.svg";
import returnArrow from "../assets/returnArrow.svg";
import bookmark from "../assets/bookmark.svg";
import { jwtDecode } from "jwt-decode";
import TextAreaComponent from "../components/TextArea";

interface Question {
  idQuest: string;
  idUser: string;
  title: string;
  description: string;
  context: string;
  updatedAt: string;
  votes: number;
  status: string;
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

interface MyJwtPayload {
  id: string;
  exp: number;
}

const Question: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [answers, setAnswers] = useState<any[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<User | null>(null);
  const [answerText, setAnswerText] = useState<string>(""); // State for the answer text
  const [answerImages, setAnswerImages] = useState<string[]>([]); // State for the answer images
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { idQuest } = useParams<{ idQuest: string }>();
  const [showFlagMenu, setShowFlagMenu] = useState(false);
  const [selectedFlagType, setSelectedFlagType] = useState<string>("");
  const flagMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<MyJwtPayload>(token);
        const idUser = decodedToken.id;
        axiosInstance
          .get(`/users/${idUser}`)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user status", error);
          });
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }

    const fetchData = async () => {
      try {
        const questionResponse = await axiosInstance.get(`questions/${idQuest}`);
        const fetchedQuestion = questionResponse.data;
        setQuestion(fetchedQuestion);

        if (fetchedQuestion.idUser) {
          const userResponse = await axiosInstance.get(`users/${fetchedQuestion.idUser}`);
          setUserQuestion(userResponse.data);
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

  const handleClickFav = async () => {
    if (!user || !question) {
      alert("User or question data is missing.");
      return;
    }
    try {
      await axiosInstance.post(`favorites/add`, { idUser: user.idUser, idQuest: question.idQuest });
      alert("Question added to favorites.");
    } catch (error) {
      console.error("Error adding question to favorites", error);
      alert("Failed to add question to favorites.");
    }
  };

  const handleFlagClick = async () => {

    if (!user || !question || !selectedFlagType) {
      alert("User, question data, or flag type is missing.");
      return;
    }

    const flagData = {
      idUser: user.idUser,
      idQuest: question.idQuest,
      flagType: selectedFlagType
    };

    try {
      console.log("Flagging question", typeof(question.idQuest),typeof(user.idUser), typeof(selectedFlagType));
      await axiosInstance.post('questions/addFlag', flagData);
      alert('Question flagged successfully');
      setShowFlagMenu(false);
    } catch (error) {
      console.error('Error flagging the question', error);
      alert('Failed to flag the question');
    }
  };

  const toggleFlagMenu = () => {
    setShowFlagMenu(!showFlagMenu);
  };

  const selectFlagType = (type: string) => {
    setSelectedFlagType(type);
    handleFlagClick();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (flagMenuRef.current && !flagMenuRef.current.contains(event.target as Node)) {
      setShowFlagMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleReturnClick = () => {
    navigate(-1);
  };

  const handleAnswerSubmit = async () => {
    if (!user || !question || !answerText) {
      alert("User, question, or answer data is missing.");
      return;
    }
  
    let answerData;
  
    if (answerImages.length < 1) {
      answerData = {
        idUser: user.idUser,
        idQuest: question.idQuest,
        content: answerText,
      };
    } else {
      answerData = {
        idUser: user.idUser,
        idQuest: question.idQuest,
        content: answerText,
        listPictures: answerImages,
      };
    }
  
    try {
      console.log("console data", answerData);
      const response = await axiosInstance.post('/answers/create', answerData);
      setAnswers([...answers, response.data]); // Add the new answer to the list of answers
      setAnswerText(""); // Clear the editor
      setAnswerImages([]); // Clear the images
      setImagePreviews([]); // Clear the image previews
    } catch (error) {
      console.error('Error submitting the answer', error);
      alert('Failed to submit the answer');
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray
        .filter((file: File) => file.type.startsWith("image/"))
        .slice(0, 5 - answerImages.length);

      if (validFiles.length !== filesArray.length) {
        alert("Please upload only image files.");
      } else {
        const newImageUrls = validFiles.map((file) => URL.createObjectURL(file));
        setAnswerImages((prevImages) => [...prevImages, ...validFiles.map((file) => file.name)]);
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newImageUrls]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...answerImages];
    const newPreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setAnswerImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSetSolved = () => {
    if (!question) {
      alert("Question data is missing.");
      return;
    }
    return async () => {
      try {
        await axiosInstance.post(`questions/setSolved`, {idQuest: question.idQuest, idUser: user?.idUser});
        setQuestion({ ...question, status: "Solved" });
      } catch (error) {
        console.error("Error setting question as solved", error);
        alert("Failed to set question as solved");
      }
    };
  }

  return (
    <div>
      <Header />
      <div className="topInfos">
      <img src={returnArrow} alt="return arrow" onClick={handleReturnClick} style={{ cursor: 'pointer' }} />
        {question?.status === "Solved" && (
          <div className="status solved">
            Question solved!
          </div>
        )}
        <div className="flagMenuContainer" ref={flagMenuRef}>
          <img src={flagLogo} alt="Flag logo" onClick={toggleFlagMenu} style={{ cursor: 'pointer' }} />
          {showFlagMenu && (
            <div className="flagMenu">
              <button onClick={() => selectFlagType("Spam")}>Spam</button>
              <button onClick={() => selectFlagType("Inappropriate")}>Inappropriate</button>
            </div>
          )}
        </div>
      </div>
      <div className="questionPage">
        <div className="upVote">
          <AnimatedUpVote voteCount={question ? question.votes : 0} />
          <img className="favIcon" src={bookmark} alt="Fav logo" onClick={handleClickFav} style={{ cursor: 'pointer' }} />
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

        {(question?.status !== "Solved" && user?.role === "Lecturer") && (
          <TextAreaComponent
          answerText={answerText}
          setAnswerText={setAnswerText}
          handleAnswerSubmit={handleAnswerSubmit}
          handleImageChange={handleImageChange}
          imagePreviews={imagePreviews}
          handleRemoveImage={handleRemoveImage}
          useCase="answer"
        />
        )}
        {question?.idUser===user?.idUser && answers.length!=0 && question?.status==="Unsolved" &&(
          <div className="setSolvedContainer">
            <button className="setSolvedButton" onClick={handleSetSolved()}>Set as solved</button>
          </div>)}

          {question?.idUser===user?.idUser && answers.length==0 && question?.status==="Unsolved" &&(
            <div className="editQuestionContainer">
              <button className="editQuestionButton" onClick={() => navigate(`/question/${question.idQuest}/edit`)}>Edit question</button>
            </div>)}
      </div>
    </div>
  );
};

export default Question;
