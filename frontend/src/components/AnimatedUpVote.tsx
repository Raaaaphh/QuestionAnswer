import React, { useState, useEffect } from "react";
import "./AnimatedUpVote.css";

interface AnimatedUpVoteProps {
  voteCount: number;
}

const AnimatedUpVote: React.FC<AnimatedUpVoteProps> = ({ voteCount }) => {
  const [clicked, setClicked] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [count, setCount] = useState(voteCount);

  useEffect(() => {
    setCount(voteCount);
  }, [voteCount]);

  const handleClick = async () => {
    if (!clicked) {
      setClicked(true);
      setTimeout(() => setClicked(false), 3000);

      if (!hasVoted) {
        setHasVoted(true);
        setCount(count + 1);
        await fetch("http://localhost:3000/addVote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questionId: "yourQuestionId" }),
        });
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
