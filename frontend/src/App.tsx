import { Routes } from './Routes';
import './App.css';


function App() {
  fetch("http://localhost:3000/auth/test")
    .then(async (res) => {
      if (!res.ok) {
        throw new Error();
      }
      const textResponse = await res.text();
      console.log(textResponse);
    })
    .catch(() => {
      console.log("Error");
    });
  return (
    <div>
      <Routes/>
    </div>
    
  );
}

export default App;
