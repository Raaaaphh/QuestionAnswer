import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import MarkdownEditor from "../components/MarkdownEditor";
import "./AskAQuestion.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

type MyJwtPayload = {
  id: string;
  exp: number;
};

type QuestionCreateDto = {
  title: string;
  description: string;
  context: string;
  idUser: string;
  listTags: string[];
  listPictures?: string[];
};

function AskAQuestion() {
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [description, setDescription] = useState("");
  const [context, setContext] = useState("");
  const [title, setTitle] = useState("");
  const [idUser, setIdUser] = useState("");

  const navigate = useNavigate();

  const mockTags = [
    "44cce6e6-e4ee-461e-8b6b-54564e0c7440",
    "f361a618-5440-4042-a833-8bf9a6a3c792",
    "1be6206e-391a-4031-a346-81e7aa70bf3c",
  ];

  const tagDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target) &&
        isTagDropdownOpen
      ) {
        setIsTagDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTagDropdownOpen]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray
        .filter((file: File) => file.type.startsWith("image/"))
        .slice(0, 5);

      if (validFiles.length !== filesArray.length) {
        setError("Please upload only image files.");
      } else {
        setError(null);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages: string[] = [...images];
    const newPreviews: string[] = [...imagePreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length === 0) {
      setError("Please upload at least one image to submit the form.");
      return;
    }

    console.log("Form submitted with images:", images);
    console.log("Selected tags:", selectedTags);
    console.log("Description:", description);
    console.log("Context:", context);
  };

  const filteredTags = mockTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      console.log("Creating question...", {
        title: title,
        description: description,
        context: context,
        idUser: idUser,
        listTags: selectedTags,
        listPictures: images,
      });
      if (images.length <= 0) {
        const response = await axiosInstance.post("questions/create", {
          title: title,
          description: description,
          context: context,
          idUser: idUser,
          listTags: selectedTags,
        });
      } else {
        const response = await axiosInstance.post("questions/create", {
          title: title,
          description: description,
          context: context,
          idUser: idUser,
          listTags: selectedTags,
          listPictures: images,
        });
      }
      navigate("/");
    } catch (error) {
      setError("Error creating question: " + error);
    }
  };

  return (
    <div>
      <Header />
      <div className="askContainer">
        <div className="askFormSection">
          <form className="askForm" onSubmit={handleSubmit}>
            <div className="guideSection">
              <h2>How to write a proper title :</h2>
              <p>Here are some tips for crafting an effective title :</p>
              <ul>
                <li>
                  Use Keywords: Include relevant keywords for searchability.
                  Example: 'HTML/CSS/JS: Animate button arrow to checkmark on
                  click'
                </li>
                <li>
                  Be Concise: Keep it brief but informative. Example:
                  'JavaScript: Rotate arrow to checkmark on button click'
                </li>
                <li>
                  Highlight Action: Indicate the desired outcome or action.
                  Example: 'Animate button to change arrow to checkmark on
                  click'
                </li>
                <li>
                  Be Specific: Clearly state the main topic or problem. Example:
                  'How to animate a button click to change an arrow into a
                  checkmark?'
                </li>
              </ul>
            </div>

            <label htmlFor="title"></label>
            <input
              type="text"
              id="title"
              placeholder="Title of your question"
              name="title"
              className="titleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="guideSection">
              <h2>How to write a good question :</h2>
              <ul>
                <li>
                  Briefly State the Problem: Summarize the issue you're facing
                  in a sentence or two. Example: 'Struggling to align navigation
                  menu items on smaller screens.'
                </li>
                <li>
                  Describe Efforts Made: Mention any steps you've already taken
                  to solve the problem. Example: 'Tried adjusting CSS flexbox
                  properties without success.'
                </li>
                <li>
                  Ask Clear Question: Clearly articulate the specific question
                  you need help with. Example: 'How can I ensure consistent
                  alignment for menu items across screen sizes?'
                </li>
                <li>
                  Provide Relevant Context: Include any necessary details or
                  constraints. Example: 'Using HTML, CSS for navigation menu in
                  a responsive website.'
                </li>
                <li>
                  End with Appreciation: Conclude with a brief thank-you
                  message. Example: 'Appreciate any guidance. Thanks!'
                </li>
              </ul>
            </div>

            <label htmlFor="description">Description:</label>
            <MarkdownEditor
              value={description}
              onChange={(value) => setDescription(value)}
            />

            <div className="guideSection">
              <h2>How to write a clear context for your question :</h2>
              <ul>
                <li>
                  Identify the Purpose: Determine why you are asking the
                  question and what information you need. This will help you
                  frame your context.
                </li>
                <li>
                  Provide Background Information: Offer any necessary background
                  information that will help the reader understand the
                  situation. This could include relevant details, history, or
                  prior events.
                </li>
                <li>
                  Be Specific: Clearly state the main issue or topic. Avoid
                  vague statements and be as precise as possible.
                </li>
                <li>
                  Include Relevant Details: Add any specific details that are
                  important for understanding the context. This might include
                  dates, names, locations, or any other pertinent information.
                </li>
                <li>
                  State the Question Clearly: Formulate your question in a clear
                  and concise manner. Make sure it directly relates to the
                  context you've provided.
                </li>
                <li>
                  Check for Clarity: Read through your context and question to
                  ensure it makes sense. Ask yourself if someone with no prior
                  knowledge of the situation would understand it.
                </li>
                <li>
                  Revise for Brevity: Remove any unnecessary information that
                  doesn't contribute to understanding the question.
                </li>
              </ul>
            </div>

            <label htmlFor="context">Context:</label>
            <MarkdownEditor
              value={context}
              onChange={(value) => setContext(value)}
            />

            {/* Tag selection section */}
            <div className="tagSection">
              <h2>Select Tags (up to 5):</h2>
              <div className="tagsContainer">
                {selectedTags.map((tag, index) => (
                  <span key={index} className="tag selected">
                    {tag}
                    <button type="button" onClick={() => handleTagChange(tag)}>
                      x
                    </button>
                  </span>
                ))}
                {selectedTags.length < 5 && (
                  <button
                    type="button"
                    className="addTagButton"
                    onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                  >
                    +
                  </button>
                )}
              </div>
              {isTagDropdownOpen && (
                <div className="tagDropdownWrapper" ref={tagDropdownRef}>
                  <div className="tagDropdown">
                    <input
                      type="text"
                      placeholder="Search tags..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <div className="tagDropdownList">
                      {filteredTags.map((tag, index) => (
                        <div
                          key={index}
                          className="tagDropdownItem"
                          onClick={() => handleTagChange(tag)}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="fileSelectorContainer">
              <h2>Select images or screenshots (up to 5):</h2>
              <input
                type="file"
                id="fileInput"
                className="fileInput"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                disabled={images.length >= 5}
              />
              <label htmlFor="fileInput" className="fileInputLabel">
                Upload Images
              </label>
              {error && <p className="error">{error}</p>}
              <div className="imagePreviews">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="imagePreview">
                    <img src={preview} alt={`preview ${index}`} />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskAQuestion;
