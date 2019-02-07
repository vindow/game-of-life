import React, { Component } from 'react';
import Board from './game/board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <Board></Board>
      </div>
    );
  }
}

export default App;
