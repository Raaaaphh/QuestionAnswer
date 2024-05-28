import React, { useState } from "react";
import "./AnimatedUpVote.css";

const AnimatedUpVote: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setClicked(!clicked);
    if (count === 0) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
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
