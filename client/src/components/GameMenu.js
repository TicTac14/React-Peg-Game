import React from "react";


export default function GameMenu({onClick}) {
    return (
        <div className="gameMenu">
            <div className="menu-title">
                Peg-Game
            </div>
            <div className="menu-author">
                Created by: Francisco Mendez
            </div>
            <button className="menu-start" onClick={onClick}>
                Start Game
            </button>
        </div>
    )
}