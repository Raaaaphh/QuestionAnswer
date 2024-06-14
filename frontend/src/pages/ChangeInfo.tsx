import React, { useState, useEffect } from "react";
import "./ChangeInfo.css";
import returnArrow from "../assets/returnArrow.svg";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../components/ReturnButton";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

interface User {
  idUser: string;
  name: string;
  email: string;
  password: string;
  confirmed: boolean;
  banned: boolean;
  color: string;
  createdAt: string;
  emailToken: string;
  role: string;
  updatedAt: string;
}

type MyJwtPayload = {
  id: string;
  exp: number;
};

const ChangeInfo: React.FC<{ isPassword: boolean }> = ({ isPassword }) => {
  const [idUser, setIdUser] = useState<User | null>(null);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const [newValue2, setNewValue2] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<MyJwtPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const userId = decodedToken.id;
          axiosInstance.get(`/users/${userId}`).then((response) => {
            setIdUser(response.data);
            console.log("User data:", idUser);
          });
        } else {
          console.log("Token has expired");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error decoding token", error);
        localStorage.removeItem("token");
      }
    }
  };

  const handleSubmitPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("users/edit/mdp", {
        oldpassword: { currentValue }.currentValue,
        newpassword: { newValue }.newValue,
        confirmpassword: { newValue2 }.newValue2,
        idUser: idUser?.idUser,
      });
      alert("Your password has changed");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleSubmitName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("users/edit/name", {
        idUser: idUser?.idUser,
        name: { newValue }.newValue,
      });
      alert("Your name has changed");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  //!!! IL FAUT AUSSI VERIFIER SI LE MOT DE PASSE ACTUEL EST CORRECT AVANT DE CHANGER LE MOT DE PASSE

  return (
    <div>
      <ReturnButton />
      <div className="change-info-container">
        {isPassword ? (
          <div>
            <h1>Change Your Password</h1>
            <form onSubmit={handleSubmitPassword} className="change-info-form">
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
              <label htmlFor="newPassword">Type your new Password</label>
              <input
                type="password"
                id="newPassword2"
                name="newPassword2"
                value={newValue2}
                onChange={(e) => setNewValue2(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={
                  currentValue === newValue ||
                  newValue.length < 3 ||
                  newValue !== newValue2
                }
              >
                Change Password
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1>Change Your Name</h1>
            <form onSubmit={handleSubmitName} className="change-info-form">
              <label htmlFor="newName">New Name</label>
              <input
                type="text"
                id="newName"
                name="newName"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={currentValue === newValue || newValue.length < 3}
              >
                Change Name
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeInfo;
