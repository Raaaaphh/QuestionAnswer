import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import axios from "axios";
import './Home.css';

const Home = () => {
  const [questions, setQuestions] = useState([]);
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
