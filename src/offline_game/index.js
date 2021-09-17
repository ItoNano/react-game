import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Board from './board'
import ButtonArea from './ButtonArea'
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
    if (process.env.REACT_APP_MODE !== "local") {
        console.log('テスト')
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
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
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
    const statusText = () => {
        return '次のプレイヤー';
    };

    const backStatus = () => {
        if (gameState.stepNumber !== 0) {
            setGameState(state =>({
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
    }
    const history = gameState.history;
    const current = history[gameState.stepNumber];
    const winner = calculateWinner(current.squares);
    const gameTitle = <div className="gameWrapper__title">マルバツゲーム</div>;


    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = statusText() + (gameState.xIsNext ? 'X' : 'O');
    }
    return (
        <div className="gameWrapper">
            <div>{gameTitle}</div>
            <div className="gameWrapper__board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)} />
            </div>
            <div className="gameWrapper__info">
                <div>{status}</div>
            </div>
            <ButtonArea backStatus={backStatus} goStatus={goStatus} />
        </div>
    );
}
export default OfflineGame;