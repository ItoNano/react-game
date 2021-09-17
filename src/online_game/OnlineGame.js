import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Board from './board';
import ButtonArea from './ButtonArea';
const OnlineGame = (props) => {
    const [gameState, setGameState] = useState({
        squares: Array(9).fill(null),
        xIsNext: true,
        whoNext: "host",
        whoWinner: null,
    });
    const ref = firebase.database().ref('room/' + props.roomId)
    ref.on('child_changed', (snapshot) => {
        const rootList = snapshot.val();
        if (rootList && rootList.squares) {
            setGameState((state) => ({
                ...state,
                squares: JSON.parse(rootList.squares),
                whoNext: rootList.whoNext,
                whoWinner: rootList.whoWinner
            }));
        }
    });
    const handleClick = (i) => {
        if (gameState.whoNext !== props.user) {
            return;
        }
        const squares = gameState.squares.slice();
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        squares[i] = props.user === "host" ? 'X' : 'O';
        let sendState
        if (calculateWinner(squares)) {
            sendState = {
                squares: JSON.stringify(squares),
                whoWinner: props.user
            };
        } else {
            sendState = {
                squares: JSON.stringify(squares),
                whoNext: props.user === "host" ? "guest" : "host",
            };
        }
        firebase
            .database()
            .ref('room/' + props.roomId).child('gameState')
            .update(sendState);
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
    const resetGame = () => {
        const sendState = {
            squares: JSON.stringify(Array(9).fill(null)),
            whoNext: Math.random() * 2 > 1 ? "guest" : "host",
            whoWinner: null
        };
        firebase
            .database()
            .ref('room/' + props.roomId).child('gameState')
            .update(sendState);
    };
    const status = () => {
        let name;
        if (gameState.whoWinner) {
            name = gameState.whoWinner === props.user ? "あなた": "相手様"
            return <div>Winner: {name}</div>
        } else {
            name = gameState.whoNext === props.user ? "あなた": "相手様"
            return <div>次のプレイヤー: {name}</div>
        }
    }
    return (
        <div className="gameWrapper">
            <div>Room ID:{props.roomId}</div>
            <div>マルバツゲーム</div>
            <div className="gameWrapper__board">
                <Board squares={gameState.squares} onClick={(i) => handleClick(i)} />
            </div>
            <div className="gameWrapper__info">
                <div>{status()}</div>
            </div>
            <ButtonArea resetGame={resetGame} />
        </div>
    );
};

export default OnlineGame;
