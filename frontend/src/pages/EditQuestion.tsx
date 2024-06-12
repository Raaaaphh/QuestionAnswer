import { useState, useEffect } from 'react';
import './EditQuestion.css';
import axiosInstance from '../utils/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import returnArrow from '../assets/returnArrow.svg';

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

const EditQuestion: React.FC<{}> = () => {
  const [question, setQuestion] = useState<Question>({
    idQuest: "",
    idUser: "",
    title: "",
    description: "",
    context: "",
    updatedAt: "",
    votes: 0,
    status: "",
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const idQuest = useParams<{ idQuest: string }>().idQuest;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/questions/${idQuest}`);
        setQuestion(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching question data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [idQuest]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    // REQUETE POUR MODIFIER LA QUESTION
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <Header />
        <img src={returnArrow} alt="return arrow" className="return-arrow" onClick={() => navigate(-1)} />

        <div className='editPage'>
            <div className='questionContainer'>
                <h1>Edit Question</h1>
                <form className="edit-question-form">
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={question.title}
                    onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                    required
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                    id="description"
                    name="description"
                    value={question.description}
                    onChange={(e) => setQuestion({ ...question, description: e.target.value })}
                    required
                    />
                    <label htmlFor="context">Context</label>
                    <textarea
                    id="context"
                    name="context"
                    value={question.context}
                    onChange={(e) => setQuestion({ ...question, context: e.target.value })}
                    required
                    />
                    <button type="submit" onClick={handleSubmit}>Publish</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default EditQuestion;
