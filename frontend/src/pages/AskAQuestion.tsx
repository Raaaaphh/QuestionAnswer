import { useState, useEffect } from 'react';
import Header from '../components/Header';
import './AskAQuestion.css';

function AskAQuestion() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter((file: File) => file.type.startsWith("image/")).slice(0, 5);
  
      if (validFiles.length !== filesArray.length) {
        setError("Please upload only image files.");
      } else {
        setError(null);
      }
  
      setImages((prevImages: File[]) => [...prevImages, ...validFiles]);
  
      const previews = validFiles.map((file: File) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews: string[]) => [...prevPreviews, ...previews]);
    }
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length === 0) {
      setError('Please upload at least one image to submit the form.');
      return;
    }

    console.log('Form submitted with images:', images);
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
                <li>Use Keywords: Include relevant keywords for searchability. Example: "HTML/CSS/JS: Animate button arrow to checkmark on click"</li>
                <li>Be Concise: Keep it brief but informative. Example: "JavaScript: Rotate arrow to checkmark on button click"</li>
                <li>Highlight Action: Indicate the desired outcome or action. Example: "Animate button to change arrow to checkmark on click"</li>
                <li>Be Specific: Clearly state the main topic or problem. Example: "How to animate a button click to change an arrow into a checkmark?"</li>
              </ul>
            </div>

            <label htmlFor="title"></label>
            <input type="text" id="title" placeholder='Title of your question' name="title" required/>

            <div className="guideSection">
              <h2>How to write a good question :</h2>
              <ul>
                <li>Briefly State the Problem: Summarize the issue you're facing in a sentence or two. Example: "Struggling to align navigation menu items on smaller screens."</li>
                <li>Describe Efforts Made: Mention any steps you've already taken to solve the problem. Example: "Tried adjusting CSS flexbox properties without success."</li>
                <li>Ask Clear Question: Clearly articulate the specific question you need help with. Example: "How can I ensure consistent alignment for menu items across screen sizes?"</li>
                <li>Provide Relevant Context: Include any necessary details or constraints. Example: "Using HTML, CSS for navigation menu in a responsive website."</li>
                <li>End with Appreciation: Conclude with a brief thank-you message. Example: "Appreciate any guidance. Thanks!"</li>
              </ul>
            </div>

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" required></textarea>

            <div className="guideSection">
              <h2>How to write a clear context for your question :</h2>
              <ul>
                <li>Identify the Purpose: Determine why you are asking the question and what information you need. This will help you frame your context.</li>
                <li>Provide Background Information: Offer any necessary background information that will help the reader understand the situation. This could include relevant details, history, or prior events.</li>
                <li>Be Specific: Clearly state the main issue or topic. Avoid vague statements and be as precise as possible.</li>
                <li>Include Relevant Details: Add any specific details that are important for understanding the context. This might include dates, names, locations, or any other pertinent information.</li>
                <li>State the Question Clearly: Formulate your question in a clear and concise manner. Make sure it directly relates to the context you've provided.</li>
                <li>Check for Clarity: Read through your context and question to ensure it makes sense. Ask yourself if someone with no prior knowledge of the situation would understand it.</li>
                <li>Revise for Brevity: Remove any unnecessary information that doesn't contribute to understanding the question.</li>
              </ul>
            </div>

            <label htmlFor="context">Context:</label>
            <textarea id="context" name="context" required></textarea>

            <div className="fileSelectorContainer">
              <label htmlFor="fileInput" className="fileInputLabel">Upload Images</label>
              <input
                type="file"
                id="fileInput"
                className="fileInput"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              {error && <p className="error">{error}</p>}
              <div className="imagePreviews">
                {imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`preview ${index}`} />
                ))}
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskAQuestion;
