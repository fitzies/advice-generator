import { useEffect, useState } from "react";
import "./App.css";
import dice from "./assets/icon-dice.svg";

type AdviceType = {
  id: number;
  advice: string;
};

function getAdvice() {
  return fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      return {
        id: data.slip.id,
        advice: data.slip.advice,
      };
    });
}

function App() {
  const [advice, setAdvice] = useState<AdviceType>();

  useEffect(() => {
    getAdvice().then((advice) => {
      setAdvice(advice);
    });
  }, []);

  const rerollAdvice = () => {
    getAdvice().then((advice) => {
      setAdvice(advice);
    });
  };

  return (
    <div className="container">
      {!advice ? null : (
        <div className="box">
          <h4>ADVICE #{advice.id}</h4>
          <h1>"{advice.advice}"</h1>
          <div className="dice" onClick={rerollAdvice}>
            <img src={dice} alt="dice" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
