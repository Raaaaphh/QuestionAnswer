import React, { useState, useEffect } from "react";
import "./AnimatedUpVote.css";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

interface AnimatedUpVoteProps {
  voteCount: number;
  idQuestion: string;
}

type MyJwtPayload = {
  id: string;
  exp: number;
};

const AnimatedUpVote: React.FC<AnimatedUpVoteProps> = ({
  voteCount,
  idQuestion,
}) => {
  const [clicked, setClicked] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [count, setCount] = useState(voteCount);
  const [questionId, setQuestionId] = useState(idQuestion);
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    setCount(voteCount);
  }, [voteCount]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<MyJwtPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const userId = decodedToken.id;
          setIdUser(userId);
          axiosInstance.get(`/users/${userId}`).then((response) => {
            console.log("User data:", response.data);
          });
        } else {
          console.log("Token has expired");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error decoding token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleClick = async () => {
    if (!clicked) {
      setClicked(true);
      setTimeout(() => setClicked(false), 3000);

      if (!hasVoted) {
        setHasVoted(true);
        setCount(count + 1);
        const response = await axiosInstance.post("questions/addVote", {
          questionId: questionId,
          userId: idUser,
        });
        console.log("Vote added:", response.data);
      } else {
        setHasVoted(false);
        setCount(count - 1);
        await fetch("http://localhost:3000/removeVote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questionId: "yourQuestionId" }),
        });
      }
    }
  };

  return (
    <div className="button-container">
      <div className="counter">{count}</div>
      <button
        id="animated-button"
        className={`circle-button ${clicked ? "clicked" : ""}`}
        onClick={handleClick}
      >
        <span className="arrow"></span>
      </button>
    </div>
  );
};

export default AnimatedUpVote;
