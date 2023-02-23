import logo from './images/cakedefi.svg';
import './App.css';
import MasterNodes from './components/masternodes.js';
import Button from '@mui/material/Button';
import * as React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div><img src={logo} className="App-logo" alt="logo" /></div>
        <div className='rightMenuHolder'>
          <Button id='buyCryptoBtn' variant="contained">BUY CRYPTO</Button>
          <svg className='hamburger' width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M8 7h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm0 7h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm0 7h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z" fillRule="evenodd"/></svg>
        </div>
      </header>
      <MasterNodes />
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
