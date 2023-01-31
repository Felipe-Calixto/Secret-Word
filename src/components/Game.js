import { useRef, useState } from "react"
import "./Game.css"

const Game = ({pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, verifyLetters}) => {
  
  const [letter, setLetter] = useState("");
  const inputReff = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetters(letter);
    setLetter("");
    inputReff.current.focus();
  }

  return (
    <div className="game">
      <p className="points">Pontuação: <span>{score}</span></p> 
      <h1>Advinhe a Palavra</h1>
      <h3>Dica sobre a palavra: <span className="type">{pickedCategory}</span></h3>
      <div className="wordConteiner">
        {letters.map((letters, i) => (
          guessedLetters.includes(letters) ? (
            <span className="letter" key={i}>{letters}</span>
          ) : (
            <span className="whiteBox" key={i}></span>
          )
        ))}
      </div>
      <div className="inputConteiner">
        <form onSubmit={handleSubmit}>
          <input type="text" maxLength={1} required onChange={(e) => setLetter(e.target.value)} value={letter} ref={inputReff}/>
          <button>Jogar</button>
        </form>
        <p>Restam <span>{guesses}</span> tentativas...</p>
      </div>
      <div className="wrongLetterConteiner">
        <h4>Letrar incorretas</h4>
        <p>
          {wrongLetters.map((letters, i) => (
            <span key={i}>{letters},</span>
          ))}
        </p>
      </div>
    </div>
    )
}

export default Game