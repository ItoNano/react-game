import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {firebaseApp} from './firebase.js'
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        return (
            <div className="boardWrapper">
                <div className="boardWrapper__row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="boardWrapper__row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="boardWrapper__row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class ButtonArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="buttonArea">
                <div
                    className="buttonArea__back"
                    onClick={() => {
                        this.props.backStatus();
                    }}
                >
                    戻る
                </div>
                <div
                    className="buttonArea__go"
                    onClick={() => {
                        this.props.goStatus();
                    }}
                >
                    進む
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber: 0,
            xIsNext: true,
        };
        this.backStatus = this.backStatus.bind(this);
        this.goStatus = this.goStatus.bind(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }
    statusText() {
        return '次のプレイヤー';
    }

    backStatus() {
        if (this.state.stepNumber !== 0) {
            this.setState({
                stepNumber: this.state.stepNumber - 1,
                xIsNext: !this.state.xIsNext,
            });
        }
    }
    goStatus() {
        if (this.state.stepNumber !== this.state.history.length - 1) {
            this.setState({
                stepNumber: this.state.stepNumber + 1,
                xIsNext: !this.state.xIsNext,
            });
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        console.log('テスト', firebaseApp)

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            if (true) {
                return (<div key={move}></div>)
            } else {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }
        });
        const gameTitle = <div>マルバツゲーム</div>;

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = this.statusText() + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="gameWrapper">
                {gameTitle}
                <div className="gameWrapper__board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="gameWrapper__info">
                    <div>{status}</div>
                    <div>{moves}</div>
                </div>
                <ButtonArea backStatus={this.backStatus} goStatus={this.goStatus} />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
