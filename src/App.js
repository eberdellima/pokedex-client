import React from 'react';
import './App.css';
import PokemonView from './components/pokemon-view';

function App() {
  return (
    <div className="content">
      <h1>PokeDex</h1>
      <div>
        <PokemonView/>
      </div>
    </div>
  );
}

export default App;
