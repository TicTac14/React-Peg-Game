import React, {useState} from "react";


export default function GameStats(){
    const [time, setTime] = useState(getTime());
    function getTime(){
        const date = new Date();
        const hour = date.getHours();
        const mins = date.getMinutes();
        const secs = date.getSeconds();
        console.log(`${hour}:${mins}:${secs}`);
        return `${hour<=12?hour:hour-12}:${mins<10?"0"+String(mins):mins}:${secs<10?'0'+String(secs):secs} ${hour<12?'AM':'PM'}`;
    }
    setInterval(() => setTime(getTime()), 500);
    return (
        <div className="gameStats">
            <div className="stats-title">Peg-Game</div>
            <div className="stats-info">
                <div className="time">
                    {time}
                </div>
            </div>
             
        </div>
        
    )
}