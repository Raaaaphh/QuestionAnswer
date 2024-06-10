// ProfilePicture.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import LecturerIcon from '../assets/LecturerIcon.png'; // Ensure the path is correct
import './ProfilePicture.css';

interface ProfilePictureProps {
  userId: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ userId }) => {
  const [user, setUser] = useState<{
    name: string;
    role: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const getInitials = (name: string) => {
    const initials = name.split(' ').map(part => part[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  return (
    <div>
      {user?.role === 'Student' ? (
        <div
        className="avatar"
        style={{
          backgroundColor: user?.color ? `#${user.color}` : ""
        }}
        >
            <span className="initials">{getInitials(user.name)}</span>
        </div>
      ) : (
        <img src={LecturerIcon} alt="LecturerIcon" className="lecturer-icon" />
      )}
    </div>
  );
};

export default ProfilePicture;
