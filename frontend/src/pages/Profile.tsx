import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './Profile.css';
import QuestionComp from '../components/QuestionComp';

// Define the interfaces for your data structures
interface User {
  idUser: string;
  name: string;
  email: string;
  avatar: string;
}

interface Tag {
  idTag: string;
  name: string;
}

interface Question {
  idQuest: string;
  title: string;
  description: string;
  user: User;
  status: boolean;
  questiontags: { tag: Tag }[];
}

interface Favorite {
  idQuest: string;
  question: Question;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [favorites, setFavorites] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = '1';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserQuestions = async () => {
      try {
        const response = await axios.get(`/questions/findByUser/${userId}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching user questions:', error);
      }
    };

    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get(`/favorites/findByUser/${userId}`);
        setFavorites(response.data.map((fav: Favorite) => fav.question));
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

    fetchUserData();
    fetchUserQuestions();
    fetchUserFavorites();
    setLoading(false);
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className='profileContainer'>
        {user ? (
          <div className='profileSection'>
            <div className='userInfos'>
              <div className='avatarUsername'>
                <img src={user.avatar} alt='avatar' className='avatar' />
                <h2>PROFILE</h2>
              </div>
              <div className='userDetails'>
                <div className='userDetail'>
                  <h3>First Name</h3>
                  <p>{user.name}</p>
                </div>
                <div className='userDetail'>
                  <h3>Email</h3>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
            <div className='previousQuestions'>
              <h3>Previous Questions</h3>
              <div className="questionsContainer">
                {questions.map((question) => (
                  <QuestionComp
                    key={question.idQuest}
                    idQuest={question.idQuest}
                    title={question.title}
                    description={question.description}
                    username={question.user.name} 
                    status={question.status}
                    tags={question.questiontags.map(qt => qt.tag.name)}
                  />
                ))}
              </div>
            </div>
            <div className='followedQuestions'>
              <h3>Followed Questions</h3>
              <div className="questionsContainer">
                {favorites.map((question) => (
                  <QuestionComp
                    key={question.idQuest}
                    idQuest={question.idQuest}
                    title={question.title}
                    description={question.description}
                    username={question.user.name} 
                    status={question.status}
                    tags={question.questiontags.map(qt => qt.tag.name)} 
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
