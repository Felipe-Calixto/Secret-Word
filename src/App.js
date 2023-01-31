import './App.css';

//React
import { useCallback, useEffect, useState } from "react";

//Data
import { wordList } from "./data/wordsList";

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import EndGame from './components/EndGame';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0]);
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState(["a"]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  
  const pickWordEndCategory = () => {
    
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = wordList[category][Math.floor(Math.random() * wordList[category].length)];

    return {category, word}
  }

  const startGame = useCallback(() => {
  
    const {category, word} = pickWordEndCategory();
    
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((e) => e.toLowerCase());
    
    clearStates();
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1]);
  });

  const verifyLetters = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearStates = () => {
    
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {

    if (guesses <= 0) {

      clearStates();
      setGameStage(stages[2]);
    }

  }, [guesses]);

  const retry = () => {
    
    setGuesses(3);
    setScore(0);
    setGameStage(stages[0]);
  }

  useEffect(() => {

    const uniqueLetters = [... new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length) {
      
      setScore((actualScore) => actualScore + 100);
      
      startGame();
    }
    console.log(guessedLetters, uniqueLetters)

  }, [guessedLetters, letters, startGame])
  return (
    <div className="App">
      {gameStage === stages[0] && < StartScreen startGame={startGame}/>}
      {gameStage === stages[1] && < Game 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory} 
      letters={letters} 
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      verifyLetters={verifyLetters}/>}
      {gameStage === stages[2] && < EndGame retry={retry} score={score}/>}
    </div>
  );
}

export default App;
