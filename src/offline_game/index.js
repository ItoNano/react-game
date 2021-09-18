import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Board from './board';
import ButtonArea from './ButtonArea';
const OfflineGame = (props) => {
    const [gameState, setGameState] = useState({
        history: [
            {
                squares: Array(9).fill(null),
            },
        ],
        stepNumber: 0,
        xIsNext: true,
    });
    if (process.env.REACT_APP_MODE !== 'local') {
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STOROGA_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
        };
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        const ref = firebase.database().ref('offline');
        const today = new Date();
        ref.push({
            timestamp: today.toLocaleString(),
        });
    }
    const handleClick = (i) => {
        const history = gameState.history.slice(0, gameState.stepNumber + 1);
        const current = history[gameState.stepNumber];
        const squares = current.squares.slice();
        if (calculateWinner(squares)) {
            return;
        } else if (squares[i] && gameState.selected) {
            movePiece(i);
            return;
        } else if (squares[i]) {
            setPiece(i);
            return;
        }
        squares[i] = gameState.xIsNext ? 'X' : 'O';
        setGameState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: history.length,
            xIsNext: !gameState.xIsNext,
        });
    };

    const backStatus = () => {
        if (gameState.stepNumber !== 0) {
            setGameState((state) => ({
                ...state,
                stepNumber: gameState.stepNumber - 1,
                xIsNext: !gameState.xIsNext,
            }));
        }
    };
    const goStatus = () => {
        if (gameState.stepNumber !== gameState.history.length - 1) {
            setGameState({
                stepNumber: gameState.stepNumber + 1,
                xIsNext: !gameState.xIsNext,
            });
        }
    };
    const calculateWinner = (squares) => {
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
    };
    const setPiece = (index) => {
        const history = gameState.history;
        const squares = history[gameState.stepNumber].squares.slice();
        const next = gameState.xIsNext ? 'X' : 'O'
        if (squares[index] === next) {
            let toArea = [];
            if (index === 0) {
                toArea = [1, 3, 4];
            } else if (index === 1) {
                toArea = [0, 2, 3, 4, 5];
            } else if (index === 2) {
                toArea = [1, 4, 5];
            } else if (index === 3) {
                toArea = [0, 1, 4, 6, 7];
            } else if (index === 4) {
                toArea = [0, 1, 2, 3, 5, 6, 7, 8];
            } else if (index === 5) {
                toArea = [1, 2, 4, 5, 7, 8];
            } else if (index === 6) {
                toArea = [3, 4, 7];
            } else if (index === 7) {
                toArea = [3, 4, 5, 6, 7];
            } else if (index === 8) {
                toArea = [4, 5, 7];
            }
            setGameState((state) => ({
                ...state,
                selected: {
                    number: index,
                    toArea: toArea,
                },
            }));
        }
    };
    const movePiece = (i) => {
        const history = gameState.history;
        const squares = history[gameState.stepNumber].squares.slice();
        if (gameState.selected.toArea.includes(i)) {
            squares[i] = gameState.xIsNext ? 'X' : 'O';
            squares[gameState.selected.number] = null;
            setGameState({
                history: history.concat([
                    {
                        squares: squares,
                    },
                ]),
                stepNumber: history.length,
                xIsNext: !gameState.xIsNext,
            });
        } else {
            setGameState((state) => ({
                ...state,
                selected: null,
            }));
        }
    };
    const history = gameState.history;
    const current = history[gameState.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = '次のプレイヤー' + (gameState.xIsNext ? 'X' : 'O');
    }
    let isSelected;
    if (gameState.selected && gameState.selected.toArea) {
        isSelected = <div>移動する場所を選択</div>;
    }
    return (
        <div className="gameWrapper">
            <div>マルバツゲーム</div>
            <div className="gameWrapper__board">
                <Board squares={current.squares} selected={gameState.selected} onClick={(i) => handleClick(i)} />
            </div>
            <div className="gameWrapper__info">
                <div>{status}</div>
            </div>
            <ButtonArea backStatus={backStatus} goStatus={goStatus} />
            {isSelected}
        </div>
    );
};
export default OfflineGame;
