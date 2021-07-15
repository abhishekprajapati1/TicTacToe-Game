import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
        <button className = "square" onClick = {props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component 
{   

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSqaure(i)
    {
        return (<Square value = {this.state.squares[i]}
        onClick = {() => this.handleClick(i)}
        />
        );
    }

    render() 
    {   const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        
        
        return (
            <div>
                <div className = "status">
                    {status}
                </div>
                <div className = "board-row">
                    {this.renderSqaure(0)}
                    {this.renderSqaure(1)}
                    {this.renderSqaure(2)}
                </div>
                <div className = "board-row">
                    {this.renderSqaure(3)}
                    {this.renderSqaure(4)}
                    {this.renderSqaure(5)}
                </div>
                <div className = "board-row">
                    {this.renderSqaure(6)}
                    {this.renderSqaure(7)}
                    {this.renderSqaure(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component{
    render(){
        return(
            <div className = "game">
                <div className = "game-board">
                    <Board />
                </div>
                <div className = "game-info">
                    <div>{/* status */}</div>
                    <div>{/* TODO */}</div>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

// ========================================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);