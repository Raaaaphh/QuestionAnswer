import { useNavigate } from 'react-router-dom';
import './ReturnButton.css';
import returnArrow from '../assets/returnArrow.svg';



const ReturnButton = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <img src={returnArrow} alt="Return" className="return-button" onClick={handleReturn} />
    );
};

export default ReturnButton;