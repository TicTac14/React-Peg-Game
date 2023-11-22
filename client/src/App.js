import React, {useState, useEffect} from 'react';
import './App.css';
import GameMenu from './components/GameMenu';
import GameStats from './components/gameStats';
import Hole from './components/hole';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);


  if (gameStarted){
    return (
      <div className='wrapper'>
          <GameStats />
          <div className='content'>
            <div className='game'>
              <div className='row row-1'>
                <Hole />
              </div>
              <div className='row row-2'>
                <Hole />
                <Hole />
              </div>
              <div className='row row-3'>
                <Hole />
                <Hole />
                <Hole />
              </div>
              <div className='row row-4'>
                <Hole />
                <Hole />
                <Hole />
                <Hole />
              </div>
              <div className='row row-5'>
                <Hole />
                <Hole />
                <Hole />
                <Hole />
                <Hole />
              </div>
              
            </div>
          </div>
      </div>
    );
  }else {
    return (
      <>
        <GameMenu onClick={() => setGameStarted(true)}/>
      </>
    );
  }
  
}

