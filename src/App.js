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

  console.log(words)

  return (
    <div className="App">
      {gameState === "start" && <StartScreen />}
      {gameState === "game" && <Game />}
      {gameState === "end" && <GameOver/>}
    </div>
  );
}

export default App;
