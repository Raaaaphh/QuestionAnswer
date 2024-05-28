import React, { useEffect, useState } from 'react';
import './QuestionComp.css';
import { Link } from 'react-router-dom';
import upVoteLogo from '../assets/upVoteButton.svg';
import axiosInstance from '../utils/axiosInstance';

interface QuestionProps {
  idQuest: string;
  title: string;
  description: string;
  status: boolean;
  votes: number;
}

const QuestionComp: React.FC<QuestionProps> = ({ idQuest, title, description, status }) => {
  const [question, setQuestion] = useState<{ idUser: string } | null>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch question data
        const questionResponse = await axiosInstance.get(`/questions/${idQuest}`);
        setQuestion(questionResponse.data);

        const userId = questionResponse.data.idUser; // Use the response data directly

        // Fetch user data
        const userResponse = await axiosInstance.get(`/users/${userId}`);
        setUser(userResponse.data);

        const questionTagsResponse = await axiosInstance.get(`/tags/${idQuest}`);
        setTags(questionTagsResponse.data);
        
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false); // Ensure loading state is set correctly
      }
    };

    fetchUserData();
  }, [idQuest]); // Include idQuest in the dependency array

  if (loading) {
    return <div>Loading...</div>; // Add loading state handling
  }

  return (
    <div key={idQuest} className="questionItem">
      <div className='voteSection'>
        <p>8</p> {/* Assuming static votes for now */}
        <img src={upVoteLogo} alt="upVoteLogo" />
      </div>
      <div className='textRightPart'>
        <div className="questionTop">
          <Link to={`/question/${idQuest}`} className="title">{title}</Link>
          <Link to={`/question/${idQuest}`} className="seeMoreLink">See more ...</Link>
        </div>
        
        <p className='description'>{description}</p>
        <div className='questionBottom'>
          <div className='tags'>
            {tags && tags.map((tag, index) => (
              <p key={index} className='tagQComp'>{tag}</p>
            ))}
          </div>
          <p>Posted by: {user?.name}</p>
          {status && <p className='status'>Active</p>}
        </div>
      </div>
    </div>
  );
};

export default QuestionComp;
