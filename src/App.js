import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import Landing from './components/Landing';

const App = () => {
  return (
    <div className='app'>
      <Routes className='app'>
        <Route path='/' exact element={<Landing />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
