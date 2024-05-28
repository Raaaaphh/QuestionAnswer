import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import axios from "axios";
import QuestionComp from '../components/QuestionComp';
import './Home.css';

const mockQuestions = [
  {
    idQuest: 1,
    title: 'How to solve a Rubik\'s Cube?',
    description: 'I have been trying to solve a Rubik\'s Cube for a while now, but I can\'t seem to figure it out. I have watched numerous tutorials and read several guides, but I always get stuck at some point. The algorithms and sequences are quite confusing, and I often end up making things worse instead of better. I am looking for a step-by-step guide that can break down the process into simpler, more manageable parts. Maybe some tips on how to remember the different algorithms or any tricks that can help me get past the difficult stages would be really helpful. I would also love to hear about different methods, such as the beginner\'s method, the CFOP method, or any other methods that are considered effective. Any advice or resources that can make this process easier to understand and follow would be greatly appreciated.',
    user: {
      username: 'PuzzleLover'
    },
    status: 'unsolved',
    tags: ['Rubik\'s Cube', 'Puzzle', 'Logic', 'Problem Solving']
  },
  {
    idQuest: 2,
    title: 'What is the best way to learn JavaScript?',
    description: 'I am new to programming and want to learn JavaScript. I have heard that it is a versatile and widely-used language, especially for web development. I am eager to start building my own websites and applications, but I am unsure where to begin. There are so many resources available online, including tutorials, courses, and books, that it is overwhelming to choose the right one. Should I start with the basics of JavaScript syntax and gradually move on to more advanced topics like asynchronous programming, or should I dive right into building projects? Are there any specific online platforms or courses that are highly recommended for beginners? Additionally, I would like to know if there are any common pitfalls to avoid when learning JavaScript. I am also curious about the best practices and coding standards that I should follow from the beginning to ensure that my code is clean and maintainable. Any advice on structuring my learning path and making the most out of my study time would be very helpful.',
    user: {
      username: 'NewCoder'
    },
    status: 'solved',
    tags: ['JavaScript', 'Programming', 'Web Development', 'Frontend']
  },
  {
    idQuest: 3,
    title: 'How to improve my painting skills?',
    description: 'I have been painting for a while now, but I feel like I am not improving. Despite spending a lot of time practicing, my work still lacks the depth and detail that I see in other artists\' works. I struggle with creating realistic textures and capturing the right light and shadows. I often get frustrated when my paintings do not turn out the way I envisioned them. I am looking for tips or resources that can help me refine my techniques and take my painting skills to the next level. Are there any specific exercises or practices that can help improve my brush control and color mixing abilities? How can I better understand and apply the principles of composition and perspective in my work? I would also appreciate recommendations for instructional books, online courses, or workshops that focus on these aspects. Additionally, any advice on developing my own style and finding inspiration would be wonderful. I want to become more confident in my abilities and produce artwork that I am truly proud of.',
    user: {
      username: 'ArtisticSoul'
    },
    status: 'unsolved',
    tags: ['Painting', 'Art', 'Creativity', 'Skills']
  },
  {
    idQuest: 4,
    title: 'What is the capital of Australia?',
    description: 'I am studying for a geography quiz and I can\'t remember the capital of Australia. I have gone through my study materials multiple times, but this particular fact keeps slipping my mind. I know that Australia is a fascinating country with a unique geography, diverse wildlife, and rich cultural heritage. Remembering the capitals of different countries has always been a challenge for me, and I am looking for effective memorization techniques that can help with this. Can someone provide a clear and memorable way to remember the capital of Australia? Additionally, any interesting facts or trivia about the capital city that might make it easier to remember would be greatly appreciated. I find that associating facts with stories or unique details often helps with retention. Any help on this topic would be very beneficial for my quiz preparation.',
    user: {
      username: 'GeographyEnthusiast'
    },
    status: 'solved',
    tags: ['Geography', 'Australia', 'Capital']
  },
  {
    idQuest: 5,
    title: 'How to bake a perfect cake?',
    description: 'I love baking, but I always struggle with getting my cakes to come out perfect. No matter how closely I follow the recipe, something always seems to go wrong. Sometimes the cake is too dry, other times it is too dense or does not rise properly. I have experimented with different ingredients and techniques, but the results are inconsistent. I am looking for foolproof tips or a reliable recipe that can help me achieve that perfect texture and flavor every time. What are the key factors to consider when baking a cake, such as the right temperature, mixing method, and baking time? Are there any common mistakes that I should avoid to prevent the cake from collapsing or becoming too crumbly? Additionally, I would love to know any secrets to making a cake extra moist and flavorful. Any advice on frosting and decorating techniques to give my cakes a professional finish would also be wonderful. I want to improve my baking skills and delight my family and friends with delicious homemade cakes.',
    user: {
      username: 'BakingBeginner'
    },
    status: 'unsolved'
  }
];


const Home = () => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [filter, setFilter] = useState('topUnsolved');
  const [sectionTitle, setSectionTitle] = useState('Top Unsolved Questions');

  useEffect(() => {
    fetchQuestions();
    updateSectionTitle();
  }, [filter]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`endpoint/questions?status=${filter}`);
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
              <QuestionComp
                key={question.idQuest}
                idQuest={question.idQuest}
                title={question.title}
                description={question.description}
                username={question.user.username}
                status={question.status}
                tags={question.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
