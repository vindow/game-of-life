import React, { Component } from 'react';
import Board from './game/board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Life-like Cellular Automaton Simulator</h1>
        <Board></Board>
      </div>
    );
  }
}

export default App;
