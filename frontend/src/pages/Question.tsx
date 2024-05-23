import React, { useEffect, useState } from "react";
import './Question.css';
import Header from '../components/Header';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Answer from '../components/Answer';
import upVote from '../assets/upVoteButton.svg';

const fetchMarkdownFromDatabase = async () => {
  // Simulate a database fetch
  return `

Here is a code snippet:

\`\`\`javascript
function sayHello() {
  console.log("Hello, world!");
}
\`\`\`

And some other content.
  `;
};

const fetchAnswersFromDatabase = async () => {
  // Simulate a database fetch for the answers
  return [
    {
      idAnsw: '1',
      idUser: 'user1',
      content: `
      Here is a code snippet:
      
      \`\`\`javascript
      function sayHello() {
        console.log("Answer n°1!");
      }
      \`\`\`
      
      And some other content.
        `,
      final: false,
    },
    {
      idAnsw: '2',
      idUser: 'user2',
      content: `
\`\`\`javascript
function answerTwo() {
  console.log("This is answer two!");
}
\`\`\`
      `,
      final: true,
    },
  ];
};

const Question: React.FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMarkdownFromDatabase();
      setMarkdownContent(data);
      const answerData = await fetchAnswersFromDatabase();
      setAnswers(answerData);
    };

    getData();
  }, []);

  return (
    <div>
      <Header />
      <div className='questionPage'>
        <div className="voteContainer">
          <p className="upVoteCount">5</p>
          <img src={upVote} alt='avatar' className='upVote' />
        </div>
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
        <div className='answersSection'>
          {answers.map((answer) => (
            <Answer key={answer.idAnsw} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
