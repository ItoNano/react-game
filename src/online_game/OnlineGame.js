import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Board from './board';
import ButtonArea from './ButtonArea';
import PieceArea from './PieceArea';
const OnlineGame = (props) => {
    const [gameState, setGameState] = useState({
        squares: Array(9).fill({ topIsX: null, seted: [] }),
        whoNext: 'host',
        whoWinner: null,
    });
    const [myPiece, setMyPiece] = useState({
        X: [1, 1, 2, 2, 3, 3],
        O: [1, 1, 2, 2, 3, 3],
        set: null,
    });
    const ref = firebase.database().ref('room/' + props.roomId);
    ref.on('child_changed', (snapshot) => {
        const rootList = snapshot.val();
        if (rootList && rootList.squares) {
            setGameState({
                squares: JSON.parse(rootList.squares),
                whoNext: rootList.whoNext,
                whoWinner: rootList.whoWinner,
            });
        }
    });
    const nextTurn = props.user === 'host'
    const handleClick = (i) => {
        if (gameState.whoNext !== props.user) {
            return;
        }
        const squares = gameState.squares.slice();

        if (calculateWinner(squares)) {
            return;
        } else if (myPiece.set) {
        } else if (gameState.selected) {
            movePiece(i);
            return;
        } else if (squares[i].topIsX !== null) {
            setPiece(i);
            return;
        } else if (!myPiece.set) {
            return;
        }
        let seted = squares[i].seted.slice();
        if (seted[0] && seted[0].number >= myPiece.set.item) {
            return;
        }

        seted.splice(0, 0, { isX: nextTurn, number: myPiece.set.item });
        squares.splice(i, 1, {
            topIsX: nextTurn,
            seted: seted,
        });
        let sendState;
        if (calculateWinner(squares)) {
            sendState = {
                squares: JSON.stringify(squares),
                whoWinner: props.user,
            };
        } else {
            sendState = {
                squares: JSON.stringify(squares),
                whoNext: props.user === 'host' ? 'guest' : 'host',
            };
        }
        const turn = nextTurn ? 'X' : 'O';
        let rest = myPiece[turn].slice();
        rest.splice(myPiece.set.index, 1);
        setMyPiece((state) => ({
            ...state,
            [turn]: rest,
            set: null,
        }));
        firebase
            .database()
            .ref('room/' + props.roomId)
            .child('gameState')
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
            if (squares[a].topIsX && squares[a].topIsX === squares[b].topIsX && squares[a].topIsX === squares[c].topIsX) {
                return squares[a].topIsX;
            }
        }
        return null;
    };
    const setPiece = (index) => {
        const squares = gameState.squares.slice();
        if (squares[index].topIsX === nextTurn) {
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
                toArea = [1, 2, 4, 7, 8];
            } else if (index === 6) {
                toArea = [3, 4, 7];
            } else if (index === 7) {
                toArea = [3, 4, 5, 6, 8];
            } else if (index === 8) {
                toArea = [4, 5, 7];
            }
            setGameState((state) => ({
                ...state,
                selected: {
                    index: index,
                    number: squares[index]['seted'][0].number,
                    toArea: toArea,
                },
            }));
        }
    };
    const movePiece = (i) => {
        const squares = gameState.squares.slice();
        if (gameState.selected.toArea.includes(i)) {
            // 移動先の処理
            let seted = squares[i].seted.slice();
            if (seted[0] && seted[0].number >= gameState.selected.number) {
                return;
            }
            seted.splice(0, 0, { isX: nextTurn, number: gameState.selected.number });
            squares.splice(i, 1, {
                topIsX: nextTurn,
                seted: seted,
            });
            //移動元の処理
            seted = squares[gameState.selected.index].seted.slice();
            seted.splice(0, 1);
            if (seted.length > 0) {
                squares.splice(gameState.selected.index, 1, {
                    topIsX: seted[0].isX,
                    seted: seted,
                });
            } else {
                squares.splice(gameState.selected.index, 1, { topIsX: null, seted: [] });
            }
            let sendState;
            if (calculateWinner(squares)) {
                sendState = {
                    squares: JSON.stringify(squares),
                    whoWinner: props.user,
                };
            } else {
                sendState = {
                    squares: JSON.stringify(squares),
                    whoNext: props.user === 'host' ? 'guest' : 'host',
                };
            }
            firebase
                .database()
                .ref('room/' + props.roomId)
                .child('gameState')
                .update(sendState);
        } else {
            setGameState((state) => ({
                ...state,
                selected: null,
            }));
        }
    };
    const resetGame = () => {
        const sendState = {
            squares: JSON.stringify(Array(9).fill({ topIsX: null, seted: [] })),
            whoNext: Math.random() * 2 > 1 ? 'guest' : 'host',
            whoWinner: null,
        };
        setMyPiece({
            X: [1, 1, 2, 2, 3, 3],
            O: [1, 1, 2, 2, 3, 3],
            set: null,
        });
        firebase
            .database()
            .ref('room/' + props.roomId)
            .child('gameState')
            .update(sendState);
    };
    const usePiece = (item, index) => {
        if (gameState.whoNext !== props.user) {
            return;
        }
        if (myPiece.set && myPiece.set.item === item && myPiece.set.index === index) {
            setMyPiece((state) => ({
                ...state,
                set: null,
            }));
        } else {
            setMyPiece((state) => ({
                ...state,
                set: {
                    item: item,
                    index: index,
                },
            }));
        }
    };
    const status = () => {
        let name;
        if (gameState.whoWinner) {
            name = gameState.whoWinner === props.user ? 'あなた' : '相手様';
            return <div>Winner: {name}</div>;
        } else {
            name = gameState.whoNext === props.user ? 'あなた' : '相手様';
            return <div>次のプレイヤー: {name}</div>;
        }
    };
    let isSelected;
    if (gameState.selected && gameState.selected.toArea) {
        isSelected = <div>移動する場所を選択</div>;
    }
    return (
        <div className="gameWrapper">
            <div>Room ID:{props.roomId}</div>
            <div>マルバツゲーム</div>
            <div className="gameWrapper__board">
                <Board squares={gameState.squares} selected={gameState.selected} onClick={(i) => handleClick(i)} />
            </div>
            <div className="gameWrapper__info">
                <div>{status()}</div>
            </div>
            <ButtonArea resetGame={resetGame} />
            <PieceArea usePiece={usePiece} myPiece={myPiece} xIsNext={nextTurn ? 'X' : 'O'} />
            {isSelected}
        </div>
    );
};

export default OnlineGame;
