

export default function GameBoard({ onSelectSq, board }) {


    //function handleSelectSq(rowIndex, colIndex) {
    //    setGameBoard((prevGameBoard) => {
    //        const updateBoard = [...prevGameBoard.map((innerArray) => [...innerArray])]
    //        updateBoard[rowIndex][colIndex] = activePlayerSymbol;
    //        return updateBoard;
    //    });
    //    onSelectSq();
    //}

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (<li key={colIndex}>
                        <button
                            onClick={() => onSelectSq(rowIndex, colIndex)}
                            disabled={playerSymbol !== null}>
                            {playerSymbol}
                        </button>
                    </li>
                    ))}
                </ol>
            </li>)}
        </ol>
    
    )
}