import React from 'react';
import './css/board.css';
import { Cell } from './cell';

export class Board extends React.Component {

    constructor(props) {
        super(props);
        let cells = [];
        for (let i = 0; i < 3; i++) {
            let cellRow = [];
            for (let j = 0; j < 3; j++) {
                cellRow.push(false);
            }
            cells.push(cellRow);
        }
        this.setState({grid : cells});
        this.state = {
            grid : cells
        }
        this.nextGeneration = this.nextGeneration.bind(this);
        this.toggleCell = this.toggleCell.bind(this);
    }

    createGrid = () => {
        
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

    toggleCell = (cell) => {
        let newGrid = this.state.grid;
        if (cell.alive) {
            newGrid[cell.row][cell.col] = false;
        } else {
            newGrid[cell.row][cell.col] = true;
        }
        this.setState({grid: newGrid});
    }

    nextGeneration = (e) => {
        let newGrid = this.state.grid;
        for (let i = 0; i < newGrid.length; i++) {
            for (let j = 0; j < newGrid[0].length; j++) {
                newGrid[i][j] = this.checkNeighbors(i, j);
            }
        }
        this.setState({grid: newGrid});
    }

    checkNeighbors = (row, col) => {
        let numAliveNeighbors = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            if (i >= 0 && i < this.state.grid.length) {
                for (let j = col - 1; j <= col + 1; j++) {
                    if (j >= 0 && j < this.state.grid[i].length) {
                        if (this.state.grid[i][j]) {
                            numAliveNeighbors++;
                        }
                    }
                }
            }
        }
        console.log("Coords: " + row + ", " + col + "; numAliveNeighbors: " + numAliveNeighbors);
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

    render() {
        return(
            <div>
                <table className="boardTable">
                    {this.createTable()}
                </table>
                <button onClick={this.nextGeneration}>Step Generation</button>
            </div>
        );
    }

}