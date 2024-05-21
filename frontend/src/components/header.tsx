import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import UTPLogo from '../assets/logo.png';
import Bell from '../assets/notif.svg';
import Profile from '../assets/profile.svg';
import MagnifyingGlass from '../assets/magGlass.svg';
import Filter from '../assets/filter.svg';
import User from '../assets/user.svg';
import Key from '../assets/key.svg';
import Tag from '../assets/tag.svg';

const SearchBar: React.FC = () => {
  return (
    <div className="searchBar">
      <input type="text" placeholder="Search..." className='searchBarInput' />
      <button className='searchButton'>
        <img src={MagnifyingGlass} alt="Search" className='searchIcon' />
      </button>
    </div>
  );
};

const BtnQuestion: React.FC = () => {
  return (
    <Link to='/question'>
      <div className='btnQuestion'>Ask a question</div>
    </Link>
  );
}

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

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='notificationMenu' ref={menuRef}>
      <button onClick={toggleMenu} className='notificationButton'>
        <img src={Bell} alt="notification" className='notificationIcon' />
      </button>
      {isOpen && (
        <ul className='dropdown'>
          <li className='dropdownItem'>Notification 1</li>
          <li className='dropdownItem'>Notification 2</li>
          <li className='dropdownItem'>Notification 3</li>
        </ul>
      )}
    </div>
  );
}

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

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='filterMenu' ref={menuRef}>
      <button onClick={toggleMenu} className='filterButton'>
        <img src={Filter} alt="filter" className='filterIcon' />
      </button>
      {isOpen && (
        <ul className='dropdown'>
          <li className='dropdownItem'>
            <img src={Tag} alt="tag" className='tagIcon' />
            <p>Search by tag</p>
          </li>
          <li className='dropdownItem'>
            <img src={User} alt="user" className='userIcon' />
            <p>Search by username</p>
          </li>
          <li className='dropdownItem'>
            <img src={Key} alt="key" className='keyIcon' />
            <p>Search by keywords</p>
          </li>
        </ul>
      )}
    </div>
  );
}

const ProfileMenu: React.FC = () => {
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

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='profileMenu' ref={menuRef}>
      <button onClick={toggleMenu} className='profileButton'>
        <img src={Profile} alt="profile" className='profileIcon' />
      </button>
      {isOpen && (
        <ul className='dropdown'>
          <li className='dropdownItem'>Profile</li>
          <li className='dropdownItem'>Settings</li>
          <li className='dropdownItem'>Logout</li>
        </ul>
      )}
    </div>
  );
}

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to='/'>
        <img src={UTPLogo} alt="logo" className='logoUTPHeader' />
      </Link>
      <Link to='/' className='homeButton'><h1 className='homeButtonText'>Home</h1> <div className='underline'></div></Link>
      <SearchBar />
      <FilterMenu />
      <BtnQuestion />
      <NotificationMenu />
      <ProfileMenu />
    </header>
  );
}

export default Header;
