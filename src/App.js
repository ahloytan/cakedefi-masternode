import './App.css';
import MasterNodes from './components/masternodes.js';
import Button from '@mui/material/Button';
import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  return (
    <div className='App'>
      <div className='loading'>Loading&#8230;</div>
      <header className='App-header'>
        <a href='https://cakedefi.com/' target='_blank' rel='noreferrer'>
          <div className='App-logo '></div>
        </a>
        <div className='rightMenuHolder'>
          <Button id='buyCryptoBtn' variant='contained'>BUY CRYPTO</Button>
          <div className='hamburgerMenu'></div>
        </div>
      </header>
      <MasterNodes />
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
