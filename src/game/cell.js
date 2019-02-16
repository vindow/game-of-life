import React from 'react';
import './css/cell.css';

export class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        this.props.onClick(this.props);
    }

    render() {
        const aliveStyle = {
            backgroundColor: this.props.aliveColor
        }
        const deadStyle = {
            backgroundColor: this.props.deadColor
        }
        if (this.props.alive) {
            return (
                <button className="cell" id="aliveCell" onClick={this.handleClick} style={aliveStyle}></button>
            );
        } else {
            return (
                <button className="cell" id="deadCell" onClick={this.handleClick} style={deadStyle}></button>
            );
        }
        
    }
}