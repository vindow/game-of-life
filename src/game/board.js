import React from 'react';
import ReactTimeout from 'react-timeout';
import './css/board.css';
import { Cell } from './cell';
import ColorPicker from './colorPicker';

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

        //Set default birth/death rates for game of life (B3S23)
        let bir = [false, false, false, true, false, false, false, false, false];
        let surv = [false, false, true, true, false, false, false, false, false];

        // Create the initial state
        this.state = {
            grid : cells,
            speed: 2,
            density: 0.5,
            running: false,
            wrapping: false,
            birth: bir,
            survival: surv,
            aliveColor: "#25892D",
            deadColor: "#EFEFEF"
        }
        
        this.nextGeneration = this.nextGeneration.bind(this);
        this.toggleCell = this.toggleCell.bind(this);
        this.autoGeneration = this.autoGeneration.bind(this);
        this.pauseGeneration = this.pauseGeneration.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSurvivalInput = this.handleSurvivalInput.bind(this);
        this.randomize = this.randomize.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.handleAliveColorChange = this.handleAliveColorChange.bind(this);
        this.handleDeadColorChange = this.handleDeadColorChange.bind(this);
    }
    
    // Creates the actual to-be-displayed board of cells based on the staste of the grid array
    createBoard = () => {
        let table = [];
        // Outer loop to create rows of weeks
        for (let i = 0; i < this.state.grid.length; i++) {
            let children = [];
            //Inner loop to create columns of cells
            for (let j = 0; j < this.state.grid[i].length; j++) {
                if (this.state.grid[i][j]) {
                    children.push(<td><Cell onClick={this.toggleCell} alive={true} row={i} col={j} aliveColor={this.state.aliveColor} deadColor={this.state.deadColor}></Cell></td>);
                } else {
                    children.push(<td><Cell onClick={this.toggleCell} alive={false} row={i} col={j} aliveColor={this.state.aliveColor} deadColor={this.state.deadColor}></Cell></td>);
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
            for (let j = col - 1; j <= col + 1; j++) {
                if (this.state.wrapping) {
                    let rowToCheck = i;
                    let colToCheck = j;
                    // Check the wrapped around row if checked cell's row is on the edge of the board
                    if (i < 0) {
                        rowToCheck = this.state.grid.length - 1;
                    } else if (i >= this.state.grid.length) {
                        rowToCheck = 0;
                    }
                    // Check the wrapped around column if checked cell's column is on the edge of the baord
                    if (j < 0) {
                        colToCheck = this.state.grid[rowToCheck].length - 1;
                    } else if (j >= this.state.grid[rowToCheck].length) {
                        colToCheck = 0;
                    }

                    if (this.state.grid[rowToCheck][colToCheck]) {
                        numAliveNeighbors++;
                    }
                } else {
                    // Pass over row if out of bounds
                    if (i < 0 || i >= this.state.grid.length || j < 0 || j >= this.state.grid[0].length) {
                        continue;
                    } else {
                        if (this.state.grid[i][j]) {
                            numAliveNeighbors++;
                        }
                    }
                }
            }
        }

        // Decrement the neighbor count to not count itself as an alive neighbor
        if (this.state.grid[row][col]) {
            numAliveNeighbors--;
            return this.state.survival[numAliveNeighbors];
        } else {
            return this.state.birth[numAliveNeighbors];
        }
    }

    // Runs nextGeneration at a set interval
    autoGeneration = (e) => {
        this.setState({running: true});
        this.runInterval = this.props.setInterval(this.nextGeneration, 1000 / this.state.speed);
    }

    // Stops the set interval of autoGeneration
    pauseGeneration = (e) => {
        this.setState({running: false});
        this.props.clearInterval(this.runInterval);
    }

    // Sets the slider values to their appropriate values in the state (speed and density) as well as the checkbox variable for wrapping
    handleInput = (e) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSurvivalInput = (e) => {
        let name = e.target.name;
        let checked = e.target.checked;
        if (name.startsWith("birth")) {
            let newBirth = this.state.birth.slice();
            let index = name.slice(-1);
            newBirth[index] = checked;
            this.setState({birth: newBirth});
        } else {
            let newSurvival = this.state.survival.slice();
            let index = name.slice(-1);
            newSurvival[index] = checked;
            this.setState({survival: newSurvival});
        }
    }

    // Creates a new randomized grid based on the given density value from the slider
    randomize = (e) => {
        let newGrid = [];
        for (let i = 0; i < this.state.grid.length; i++) {
            let newGridRow = [];
            for (let j = 0; j < this.state.grid[i].length; j++) {
                if (Math.random() < this.state.density) {
                    newGridRow.push(true);
                } else {
                    newGridRow.push(false);
                }
            }
            newGrid.push(newGridRow);
        }
        this.setState({grid : newGrid});
    }

    // Clears the board completely, killing all cells
    clearBoard = (e) => {
        let newGrid = [];
        for (let i = 0; i < 40; i++) {
            let newGridRow = [];
            for (let j = 0; j < 75; j++) {
                newGridRow.push(false);
            }
            newGrid.push(newGridRow);
        }
        this.setState({grid: newGrid});
    }

    handleAliveColorChange = (color) => {
        this.setState({aliveColor: color.hex});
    }

    handleDeadColorChange = (color) => {
        this.setState({deadColor: color.hex});
    }

    render() {
        let birthChecks = [];
        let survivalChecks = [];
        for (let i = 0; i < 9; i++) {
            let birthName = "birth" + i;
            let survivalName = "survival" + i;
            birthChecks.push(<input name={birthName} type="checkbox" checked={this.state.birth[i]} onChange={this.handleSurvivalInput}></input>);
            birthChecks.push(<label>{i}</label>);
            survivalChecks.push(<input name={survivalName} type="checkbox" checked={this.state.survival[i]} onChange={this.handleSurvivalInput}></input>);
            survivalChecks.push(<label>{i}</label>);
        }
        return(
            <div id="board">
                <table id="table">
                    {this.createBoard()}
                </table>
                <div id="footer">
                    <div id="options">
                        <span className="optionsHeader">Simulation Options</span>
                        <div className="optionRow">
                            <div>
                                <span>Auto-Run Speed (iterations per second): {this.state.speed}</span>
                                <input className="slider" id="speed" name="speed" type="range" disabled={this.state.running} min="1" max="4" defaultValue={this.state.speed} onChange={this.handleInput} step="1"/>
                            </div>
                            <div>
                                <button onClick={this.autoGeneration} disabled={this.state.running}>Auto-Run Generation</button>
                                <button onClick={this.pauseGeneration} disabled={!this.state.running}>Pause Generation</button>
                                <button onClick={this.nextGeneration} disabled={this.state.running}>Step Generation</button>
                            </div>
                            <div>
                                <input name="wrapping" type="checkbox" checked={this.state.wrapping} onChange={this.handleInput}></input>
                                <label>Board Wrapping</label>
                            </div>
                        </div>
                        <div className="optionRow">
                            <div id="randomOptions">
                                <div className="row">
                                    <span>Randomize Cell Density: {this.state.density}</span>
                                    <input className="slider" id="density" name="density" type="range" min="0.1" max="0.9" defaultValue={this.state.density} onChange={this.handleInput} step="0.1"/>
                                </div>
                                <div id="buttonRow">
                                    <button onClick={this.randomize} disabled={this.state.running}>Randomize Cells</button>
                                    <button id="clearButton" onClick={this.clearBoard} disabled={this.state.running}>Clear All</button>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <span>Birth Conditions: </span>
                                    {birthChecks}
                                </div>
                                <div className="row">
                                    <span>Survival Conditions: </span>
                                    {survivalChecks}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="colors">
                        <span className="optionsHeader">Color Options</span>
                        <div className="optionRow">
                            <label>Cell Color</label>
                            <ColorPicker color={this.state.aliveColor} onChange={this.handleAliveColorChange}></ColorPicker>
                        </div>
                        <div className="optionRow">
                            <label>Grid Color</label>
                            <ColorPicker color={this.state.deadColor} onChange={this.handleDeadColorChange}></ColorPicker>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReactTimeout(Board);