import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import "./UserSearchPopup.css";

interface UserSearchPopupProps {
  onClose: () => void;
}

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

const UserSearchPopup: React.FC<UserSearchPopupProps> = ({ onClose }) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/users/search?email=${searchEmail}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching for users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetLecturer = async (userId: string) => {
    try {
      await axiosInstance.post(`/users/changeRole`, null, {
        params: {
          idUser: userId,
          role: "Lecturer",
        },
      });
      alert("User role updated successfully.");
    } catch (error) {
      console.error("Error updating user role", error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="popupOverlay">
      <div className="popupContent" ref={popupRef}>
        <button onClick={onClose} className="closeButton">X</button>
        <h3>Search User</h3>
        <input
          type="email"
          placeholder="Enter user email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearch} className="simpleButton">
          {loading ? "Searching..." : "Search"}
        </button>
        <div className="searchResults">
          {searchResults.map((user) => (
            <div key={user.idUser} className="searchResultItem">
              <p>{user.email}</p>
              <button
                onClick={() => handleSetLecturer(user.idUser)}
                className="simpleButton"
              >
                Set as Lecturer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSearchPopup;
