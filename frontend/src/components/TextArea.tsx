import React, { useState } from "react";
import "./TextArea.css";

interface TextAreaComponentProps {
  answerText: string;
  setAnswerText: (text: string) => void;
  handleAnswerSubmit: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreviews: string[];
  handleRemoveImage: (index: number) => void;
  useCase : string;
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  answerText,
  setAnswerText,
  handleAnswerSubmit,
  handleImageChange,
  imagePreviews,
  handleRemoveImage,
  useCase
}) => {
  return (
    <div className="answerEditorSection">
      <h2>Write your {useCase}:</h2>
      <textarea
        className="fancyTextarea"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder={`Write your ${useCase} here...`}
      />
      <div className="fileSelectorContainer">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="fileInput"
        />
        <div className="imagePreviews">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="imagePreviewContainer">
              <img src={preview} alt={`Preview ${index}`} className="imagePreview" />
              <button onClick={() => handleRemoveImage(index)} className="removeImageButton">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      {useCase === "answer" && (
      <button onClick={handleAnswerSubmit} className="submitButton">
        Submit {useCase}
      </button>)}
    </div>
  );
};

export default TextAreaComponent;
