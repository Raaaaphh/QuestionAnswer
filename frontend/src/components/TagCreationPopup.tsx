import React, { useEffect, useRef, useState } from "react";
import "./TagCreationPopup.css";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

interface TagCreationPopupProps {
  onClose: () => void;
  onSubmit: (tagName: string) => void;
  existingTags: string[];
}

type MyJwtPayload = {
  id: string;
  exp: number;
};

const TagCreationPopup: React.FC<TagCreationPopupProps> = ({
  onClose,
  onSubmit,
  existingTags,
}) => {
  const [tagName, setTagName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState<boolean>(false);
  const [idUser, setIdUser] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  const handleTagNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<MyJwtPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const userId = decodedToken.id;
          setIdUser(userId);
          axiosInstance.get(`/users/${userId}`).then((response) => {
            console.log("User data:", response.data);
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
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setFilteredTags(
      existingTags.filter((tag) =>
        tag.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setIsTagDropdownOpen(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!existingTags.includes(tagName)) {
      onSubmit(tagName);
    }
    //REQUETE A FAIRE POUR AJOUTER LE TAG
    const tagData = {
      name: tagName,
      description: " ",
      idUser: idUser,
    };
    axiosInstance.post("/tags/create", tagData).then((response) => {
      console.log("Tag created", response.data);
    });

    onClose();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
    if (
      tagDropdownRef.current &&
      !tagDropdownRef.current.contains(event.target as Node)
    ) {
      setIsTagDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="popupOverlay">
      <div className="popupContent" ref={popupRef}>
        <h2>Create a New Tag</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Tag name:
            <input
              type="text"
              value={tagName}
              onChange={handleTagNameChange}
              className="tagInput"
            />
          </label>
          <div className="tagSection">
            <h2>Look for already existing tags:</h2>
            <div className="tagSearch">
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsTagDropdownOpen(true)}
              />
              {isTagDropdownOpen && (
                <div className="tagDropdownWrapper" ref={tagDropdownRef}>
                  <div className="tagDropdownList">
                    {filteredTags.map((tag, index) => (
                      <div key={index} className="tagDropdownItem notClickable">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className="submitButton">
              Create tag
            </button>
            <button type="button" className="cancelButton" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TagCreationPopup;
