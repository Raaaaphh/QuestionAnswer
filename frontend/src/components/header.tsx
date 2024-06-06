import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import for jwt-decode
import axiosInstance from "../utils/axiosInstance";
import "./Header.css";
import UTPLogo from "../assets/logo.png";
import Bell from "../assets/notif.svg";
import Profile from "../assets/profile.svg";
import MagnifyingGlass from "../assets/magGlass.svg";
import Filter from "../assets/filter.svg";
import User from "../assets/user.svg";
import Key from "../assets/key.svg";
import Tag from "../assets/tag.svg";

interface MyJwtPayload {
  id: string;
  exp: number;
}

const SearchBar: React.FC = () => {
  return (
    <div className="searchBar">
      <input type="text" placeholder="Search..." className="searchBarInput" />
      <button className="searchButton">
        <img src={MagnifyingGlass} alt="Search" className="searchIcon" />
      </button>
    </div>
  );
};

const BtnQuestion: React.FC = () => {
  return (
    <Link to="/ask">
      <div className="btnQuestion">Ask a question</div>
    </Link>
  );
};

const NotificationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="notificationMenu" ref={menuRef}>
      <button onClick={toggleMenu} className="notificationButton">
        <img src={Bell} alt="notification" className="notificationIcon" />
      </button>
      {isOpen && (
        <ul className="dropdown">
          <li className="dropdownItem">Notification 1</li>
          <li className="dropdownItem">Notification 2</li>
          <li className="dropdownItem">Notification 3</li>
        </ul>
      )}
    </div>
  );
};

const FilterMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="filterMenu" ref={menuRef}>
      <button onClick={toggleMenu} className="filterButton">
        <img src={Filter} alt="filter" className="filterIcon" />
      </button>
      {isOpen && (
        <ul className="dropdown">
          <li className="dropdownItem">
            <img src={Tag} alt="tag" className="tagIcon" />
            <p>Search by tag</p>
          </li>
          <li className="dropdownItem">
            <img src={User} alt="user" className="userIcon" />
            <p>Search by username</p>
          </li>
          <li className="dropdownItem">
            <img src={Key} alt="key" className="keyIcon" />
            <p>Search by keywords</p>
          </li>
        </ul>
      )}
    </div>
  );
};

const ProfileMenu: React.FC<{ idUser: string }> = ({ idUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/auth/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="profileMenu" ref={menuRef}>
      <button onClick={toggleMenu} className="profileButton">
        <img src={Profile} alt="profile" className="profileIcon" />
      </button>
      {isOpen && (
        <ul className="dropdown">
          <li>
            <Link to={`/profile/${idUser}`} className="dropdownItem">
              Profile
            </Link>
          </li>
          <li className="dropdownItem" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from local storage:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode<MyJwtPayload>(token);
        console.log("Decoded token", decodedToken);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
          const idUser = decodedToken.id;
          console.log(typeof idUser);
          axiosInstance
            .get(`/users/${idUser}`)
            .then((response) => {
              setUserStatus(response.data.role);
              setUserId(response.data.id);
            })
            .catch((error) => {
              console.error("Error fetching user status", error);
            });
        } else {
          console.log("Token has expired");
          localStorage.removeItem("token"); // Remove token from localStorage
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error decoding token", error);
        localStorage.removeItem("token"); // Remove token from localStorage
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <img src={UTPLogo} alt="logo" className="logoUTPHeader" />
      </Link>
      <Link to="/" className="homeButton">
        <h1 className="homeButtonText">Home</h1>
        <div className="underline"></div>
      </Link>
      <SearchBar />
      {isLoggedIn ? (
        <>
          <FilterMenu />
          <BtnQuestion />
          <NotificationMenu />
          <ProfileMenu idUser={userId} />
        </>
      ) : (
        <div className="authButtons">
          <Link to="/auth/login" className="authButton">
            Login
          </Link>
          <Link to="/auth/register" className="authButton">
            Register
          </Link>
        </div>
      )}
      {userStatus && <div>User Status: {userStatus}</div>}
    </header>
  );
};

export default Header;
