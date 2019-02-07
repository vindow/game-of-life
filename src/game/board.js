import React from 'react';
import ReactTimeout from 'react-timeout';
import './css/board.css';
import { Cell } from './cell';

class Board extends React.Component {

    constructor(props) {
        super(props);
        
        // Generate a new blank grid
        let cells = [];
        for (let i = 0; i < 40; i++) {
            let cellRow = [];
            for (let j = 0; j < 75; j++) {
                cellRow.push(false);
            }
            cells.push(cellRow);
        }
        this.state = {
            grid : cells,
            speed: 2,
            running: false
        }
        this.nextGeneration = this.nextGeneration.bind(this);
        this.toggleCell = this.toggleCell.bind(this);
        this.autoGeneration = this.autoGeneration.bind(this);
        this.pauseGeneration = this.pauseGeneration.bind(this);
        this.sliderChange = this.sliderChange.bind(this);
    }
    
    createTable = () => {
        let table = [];
        
        // Outer loop to create rows of weeks
        for (let i = 0; i < this.state.grid.length; i++) {
            let children = [];
            //Inner loop to create columns of cells
            for (let j = 0; j < this.state.grid[i].length; j++) {
                if (this.state.grid[i][j]) {
                    children.push(<td><Cell onClick={this.toggleCell} alive={true} row={i} col={j}></Cell></td>);
                } else {
                    children.push(<td><Cell onClick={this.toggleCell} alive={false} row={i} col={j}></Cell></td>);
                }
            }
            // Add rows to the parent table
            table.push(<tr>{children}</tr>);
        }
        return table;
    }

    // Toggles a given cell between dead and alive
    toggleCell = (cell) => {
        let newGrid = this.state.grid;
        if (cell.alive) {
            newGrid[cell.row][cell.col] = false;
        } else {
            newGrid[cell.row][cell.col] = true;
        }
        this.setState({grid: newGrid});
    }

    // Generates the next generation of the grid
    nextGeneration = (e) => {
        // Create a new grid so that changed cells don't affect results for the current generation
        let newGrid = [];
        for (let i = 0; i < this.state.grid.length; i++) {
            let newGridRow = [];
            for (let j = 0; j < this.state.grid[i].length; j++) {
                newGridRow.push(this.checkNeighbors(i, j));
            }
            newGrid.push(newGridRow);
        }
        this.setState({grid : newGrid});
    }

    // Checks the neighbors of a given cell's coordinates returning true if the given cell should be alive and false if it should be dead
    checkNeighbors = (row, col) => {
        let numAliveNeighbors = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            // Pass over row if out of bounds
            if (i >= 0 && i < this.state.grid.length) {
                for (let j = col - 1; j <= col + 1; j++) {
                    // Pass over column if out of bounds
                    if (j >= 0 && j < this.state.grid[i].length) {
                        if (this.state.grid[i][j]) {
                            numAliveNeighbors++;
                        }
                    }
                }
            }
        }
        if (this.state.grid[row][col]) {
            // Decrement the neighbor count to not count itself as an alive neighbor
            numAliveNeighbors--;
            if (numAliveNeighbors === 2 || numAliveNeighbors === 3){
                return true;
            }
            return false;
        } else {
            if (numAliveNeighbors === 3) {
                return true;
            }
            return false;
        }
    }

    autoGeneration = (e) => {
        this.setState({running: true});
        this.runInterval = this.props.setInterval(this.nextGeneration, 1000 / this.state.speed);
    }

    pauseGeneration = (e) => {
        this.setState({running: false});
        this.props.clearInterval(this.runInterval);
    }

    sliderChange = (e) => {
        this.setState({speed: e.target.value});
    }

    render() {
        return(
            <div>
                <table className="boardTable">
                    {this.createTable()}
                </table>
                <button onClick={this.nextGeneration} disabled={this.state.running}>Step Generation</button>
                <div>
                    <span>Auto-Run Speed (iterations per second): {this.state.speed}</span>
                    <input id="stepSpeed" type="range" min="1" max="4" defaultValue={this.state.speed} onChange={this.sliderChange} step="1"/>
                    <button onClick={this.autoGeneration} disabled={this.state.running}>Auto-Run Generation</button>
                    <button onClick={this.pauseGeneration} disabled={!this.state.running}>Pause Generation</button>
                </div>
            </div>
        );
    }
}

export default ReactTimeout(Board);