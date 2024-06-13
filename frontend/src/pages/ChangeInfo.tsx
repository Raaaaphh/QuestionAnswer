import React, { useState, useEffect } from "react";
import "./ChangeInfo.css";
import returnArrow from "../assets/returnArrow.svg";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const ChangeInfo: React.FC<{ isPassword: boolean }> = ({ isPassword }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    // REQUETE POUR RECUPERER L'UTILISATEUR
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // REQUETE POUR CHANGER LE MOT DE PASSE OU LE NOM
  };

  const handleReturnClick = () => {
    navigate(-1);
  }

  //!!! IL FAUT AUSSI VERIFIER SI LE MOT DE PASSE ACTUEL EST CORRECT AVANT DE CHANGER LE MOT DE PASSE

  return (
    <div>
        <img src={returnArrow} alt="return" className="return-arrow" onClick={handleReturnClick}/>
        <div className="change-info-container">
        
        {isPassword ? (
            <div>
            <h1>Change Your Password</h1>
            <form onSubmit={handleSubmit} className="change-info-form">
                <label htmlFor="password">Current Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                required
                />
                <label htmlFor="newPassword">New Password</label>
                <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                required
                />
                <button type="submit" disabled={currentValue === newValue || newValue.length<3}>Change Password</button>
                </form>
            </div>
        ) : (
            <div>
            <h1>Change Your Name</h1>
            <form onSubmit={handleSubmit} className="change-info-form">
                <label htmlFor="newName">New Name</label>
                <input
                type="text"
                id="newName"
                name="newName"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                required
                />
                <button type="submit" disabled={currentValue === newValue || newValue.length<3}>Change Name</button>
            </form>
            </div>
        )}
        </div>
    </div>
  );
};

export default ChangeInfo;
