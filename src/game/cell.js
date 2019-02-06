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
        if (this.props.alive) {
            return (
                <button className="aliveCell" onClick={this.handleClick}></button>
            );
        } else {
            return (
                <button className="deadCell" onClick={this.handleClick}></button>
            );
        }
        
    }
}