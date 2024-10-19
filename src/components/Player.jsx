import { useState } from "react"

export default function Player({ name, symbol, isActive, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name)

    function editHandle() {
        setIsEditing(editing => !editing);
        
        if (isEditing) {
            onNameChange(symbol, playerName);
        }
        
    }

    function changeHandle(e) {
        console.log(e.target);
        setPlayerName(e.target.value);
    }
    
    let thePlayer = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        thePlayer = <input type="text" required  value={playerName} onChange={changeHandle}/>;
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {thePlayer}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => editHandle()}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}