import "./EndGame.css";

const EndGame = ({retry, score}) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h3>Sua pontuação foi de <span>{score}</span></h3>
      <button onClick={retry}>Reiniciar Jogo</button>
    </div>
  )
}

export default EndGame