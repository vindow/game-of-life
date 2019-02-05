import React from 'react';

export class Cell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alive : false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (this.state.alive) {
            kill();
        } else {
            create();
        }
    }

    create() {
        this.setState({alive : true});
    }

    kill() {
        this.setState({alive : false});
    }

    render() {
        if (this.state.alive) {
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