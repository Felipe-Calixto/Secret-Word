import "./StartScreen.css";

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Palavras Secretas</h1>
        <h3>Será que você consegue descobrir a palavra ?</h3>
        <p>Clique no botão para começar o jogo</p>
        <button onClick={startGame}>Iniciar Jogo</button>
    </div>
  )
}

export default StartScreen