import { useEffect, useState } from 'react';
import './BannerQuestion.css';
import axiosInstance from '../utils/axiosInstance';
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
                if (isAnswer) {
                    response = await axiosInstance.get(`answers/${idQuestAns}`);
                } else {
                    console.log("Question ID: ", idQuestAns);
                    response = await axiosInstance.get(`questions/${idQuestAns}`);
                }

                const fetchedQuestAns = response.data;
                setQuestionOrAnswer(fetchedQuestAns);

                if (fetchedQuestAns.idUser) {
                    const userResponse = await axiosInstance.get(`users/${fetchedQuestAns.idUser}`);
                    console.log(userResponse);
                    const fetchedUser = userResponse.data;
                    setUser(fetchedUser);
                }

            } catch (error) {
                console.error("Error fetching data from database:", error);
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
