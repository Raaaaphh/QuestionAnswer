import React, { useEffect, useState } from "react";
import './Question.css';
import Header from '../components/Header';
import MarkdownRenderer from '../components/MarkdownRenderer';

const fetchMarkdownFromDatabase = async () => {
  // Simulate a database fetch
  return `
# Example Question

Here is a code snippet:

\`\`\`javascript
function sayHello() {
  console.log("Hello, world!");
}
\`\`\`

And some other content.
  `;
};

const Question: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMarkdownFromDatabase();
      setMarkdownContent(data);
    };

    getData();
  }, []);

  return (
    <div>
      <Header />
      <div className='questionPage'>
        <div className='questionHeader'>
          <div className='avatarAndUsername'>
            <img src='https://www.w3schools.com/howto/img_avatar.png' alt='avatar' className='avatarQuestion' />
            <p className='username'>Username</p>
          </div>
          <div className='date'>
            <p>Posted on: 2021-09-01</p>
          </div>
        </div>
        <div className='questionContainer'>
          <h1>How to center a div in CSS?</h1>
          <div className='questionDescription'>
            <h2>Description:</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
          </div>
          <div className='questionContext'>
            <MarkdownRenderer markdownSource={markdownContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
