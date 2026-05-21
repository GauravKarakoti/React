import { useState } from "react";
import axios from "axios";

export default function App() {
  const [count, setCount] = useState(0);
  const [advice, setAdvice] = useState('');

  async function getAdvice() {
    if (count >= 10) {
      setCount(10);
      alert('You have exceeded the limit of advices');
      return false;
    } else {
      const response = await axios.get("https://api.adviceslip.com/advice");
      setCount(count + 1);
      setAdvice(response.data.slip.advice);
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Advice App</h1>
        
        <div className="advice-box">
          <h2 className="advice-text">
            {advice ? `"${advice}"` : "Click the button to get some advice!"}
          </h2>
        </div>

        <button className="advice-btn" onClick={getAdvice}>
          Get Advice
        </button>

        <div className="stats-container">
          <h3 className="counter-text">
            You have read <span>{count}</span> pieces of advice today!
          </h3>
          <p className="note-text">Note: You can only read 10 advice per day</p>
        </div>
      </div>
    </div>
  );
}