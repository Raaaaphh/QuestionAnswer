import { useState } from 'react';
import './EditQuestion.css';
import axiosInstance from '../utils/axiosInstance';

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

const EditQuestion: React.FC<{ idQuest: boolean }> = () => {
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

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        //REQUETE POUR MODIFIER LA QUESTION
    };
    
    
    return (
        <div>
            <h1>Edit Question</h1>
            <form className="edit-question-form">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={question.title}
                    onChange={(e) => setQuestion({...question, title: e.target.value})}
                    required
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={question.description}
                    onChange={(e) => setQuestion({...question, description: e.target.value})}
                    required
                />
                <label htmlFor="context">Context</label>
                <input
                    type="text"
                    id="context"
                    name="context"
                    value={question.context}
                    onChange={(e) => setQuestion({...question, context: e.target.value})}
                    required
                />
                <button type="submit" onClick={handleSubmit}>Edit</button>
            </form>
        </div>
    );
};

export default EditQuestion;