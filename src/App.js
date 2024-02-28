//CSS
import "./App.css";

//React
import { useCallback, useEffect, useState } from "react";

//Data
import { wordList } from "./data/words";

//Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameState, setGameState] = useState(stages[0].name);
  const [words] = useState(wordList);

  //Start the secret words game
  const startGame = () =>{
    setGameState(stages[1].name);
  }

  //Process the letter input
  const verifyLetter = () =>{
    setGameState(stages[2].name);
  }

  //Restats the game
  const retry = () =>{
    setGameState(stages[0].name);
  }

  console.log(words)

  return (
    <div className="App">
      {gameState === "start" && <StartScreen startGame = {startGame} />}
      {gameState === "game" && <Game verifyLetter={verifyLetter} />}
      {gameState === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
