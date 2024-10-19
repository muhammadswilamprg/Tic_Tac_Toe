export default function GameOver({winner, onRestart}) {
    return <div id="game-over">
        <h2>Game Over</h2>
        {winner && <p>The Smart {winner} won!</p>}
        {!winner && <p>Same IQ here, It's a draw!!</p>}
        <p>
            <button onClick={onRestart}>Rematch?</button>
        </p>
    </div>
}