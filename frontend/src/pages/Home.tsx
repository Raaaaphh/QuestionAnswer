import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import axios from "axios";
import './Home.css';

const mockQuestions = [
  {
    idQuest: 1,
    title: 'How to solve a Rubik\'s Cube?',
    description: 'I have been trying to solve a Rubik\'s Cube for a while now, but I can\'t seem to figure it out. Can anyone provide some tips or a step-by-step guide?',
    user: {
      username: 'PuzzleLover'
    },
    status: 'unsolved'
  },
  {
    idQuest: 2,
    title: 'What is the best way to learn JavaScript?',
    description: 'I am new to programming and want to learn JavaScript. What are the best resources and what is the best way to start?',
    user: {
      username: 'NewCoder'
    },
    status: 'solved'
  },
  {
    idQuest: 3,
    title: 'How to improve my painting skills?',
    description: 'I have been painting for a while now, but I feel like I am not improving. Does anyone have any tips or resources to help me improve my painting skills?',
    user: {
      username: 'ArtisticSoul'
    },
    status: 'unsolved'
  },
  {
    idQuest: 4,
    title: 'What is the capital of Australia?',
    description: 'I am studying for a geography quiz and I can\'t remember the capital of Australia. Can someone help me?',
    user: {
      username: 'GeographyEnthusiast'
    },
    status: 'solved'
  },
  {
    idQuest: 5,
    title: 'How to bake a perfect cake?',
    description: 'I love baking, but I always struggle with getting my cakes to come out perfect. Does anyone have any tips or a foolproof recipe?',
    user: {
      username: 'BakingBeginner'
    },
    status: 'unsolved'
  }
];

const Home = () => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [filter, setFilter] = useState('topUnsolved'); // Default filter
  const [sectionTitle, setSectionTitle] = useState('Top Unsolved Questions'); // Default section title

  useEffect(() => {
    fetchQuestions();
    updateSectionTitle();
  }, [filter]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`YOUR_API_ENDPOINT/questions?status=${filter}`);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const updateSectionTitle = () => {
    switch (filter) {
      case 'topUnsolved':
        setSectionTitle('Top Unsolved Questions');
        break;
      case 'topSolved':
        setSectionTitle('Top Solved Questions');
        break;
      case 'mostRecent':
        setSectionTitle('Most Recent Questions');
        break;
      default:
        setSectionTitle('All Questions');
    }
  };

  const handleFilterChange = (newFilter: React.SetStateAction<string>) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Header />
      <div className="homeContainer">
        <div className="filterContainer">
          <h3>Filter:</h3>
          <div className="filterOptions">
            <button className={filter === 'topUnsolved' ? 'active' : ''} onClick={() => handleFilterChange('topUnsolved')}>Top Unsolved</button>
            <button className={filter === 'topSolved' ? 'active' : ''} onClick={() => handleFilterChange('topSolved')}>Top Solved</button>
            <button className={filter === 'mostRecent' ? 'active' : ''} onClick={() => handleFilterChange('mostRecent')}>Most Recent</button>
          </div>
        </div>
        <div className="sectionContainer">
          <h2 className="sectionTitle">{sectionTitle}</h2>
          <div className="questionsContainer">
            {questions.map((question:any) => (
              <div key={question.idQuest} className="questionItem">
                <h3>{question.title}</h3>
                <p>{question.description}</p>
                <p>Posted by: {question.user.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
