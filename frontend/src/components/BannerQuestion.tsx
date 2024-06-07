import { useEffect, useState } from 'react';
import './BannerQuestion.css';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import ProfilePicture from './ProfilePicture';

interface BannerQuestionProps {
    idQuestAns: string;
    isAnswer: boolean;
}

const BannerQuestion: React.FC<BannerQuestionProps> = ({ idQuestAns, isAnswer }) => {
    const [user, setUser] = useState<{
        name: string;
        idUser: string;
        color: string;
        role: string;
    } | null>(null);

    const [questionOrAnswer, setQuestionOrAnswer] = useState<{
        idUser: string;
        updatedAt: string;
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (isAnswer == true) {
                    console.log(`Fetching answer with ID: ${idQuestAns}`);
                    response = await axiosInstance.get(`answers/${idQuestAns}`);
                } else {
                    console.log(`Fetching question with ID: ${idQuestAns}`);
                    response = await axiosInstance.get(`questions/${idQuestAns}`);
                }

                const fetchedQuestAns = response.data;
                console.log('Fetched question/answer:', fetchedQuestAns);
                setQuestionOrAnswer(fetchedQuestAns);

                if (fetchedQuestAns.idUser) {
                    const userResponse = await axiosInstance.get(`users/${fetchedQuestAns.idUser}`);
                    console.log('Fetched user:', userResponse.data);
                    setUser(userResponse.data);
                }

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };

        fetchData();
    }, [idQuestAns, isAnswer]);

    return (
        <div className="questionHeader">
            <div className="avatarAndUsername">
                {user?.idUser && <ProfilePicture userId={user.idUser} />}
                <p className="username">{user ? user.name : "Loading..."}</p>
            </div>
            <div className="date">
                <p>Posted on: {questionOrAnswer ? new Date(questionOrAnswer.updatedAt).toLocaleDateString() : "Loading..."}</p>
            </div>
        </div>
    );
}

export default BannerQuestion;
