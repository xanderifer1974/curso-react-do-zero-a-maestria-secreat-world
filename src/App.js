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

const guessesQty = 3;

function App() {
  const [gameState, setGameState] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    //Pick a random Category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //Pick a random Word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  //Start the secret words game
  const startGame = () => {
    //Pick word and pick category
    const { word, category } = pickWordAndCategory();

    //Create a array with letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //Fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameState(stages[1].name);
  };

  //Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])

    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }  
  };

  const clearLetterStates = () =>{
    setGuessedLetters([]);
    setWrongLetters([]);
  };


  //Function for monitoring a data
  useEffect(() =>
  {   
    if(guesses <=0){

      //Reset all states
      clearLetterStates()
      setGameState(stages[2].name);
    }
  },[guesses])

  //Restats the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameState(stages[0].name);
  };

  return (
    <div className="App">
      {gameState === "start" && <StartScreen startGame={startGame} />}
      {gameState === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameState === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
