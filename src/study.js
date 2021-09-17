import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import OnlineGame from './online_game'
import OfflineGame from './offline_game'
import { Header } from "./components";
// import { firebaseApp, firebaseStore, firebaseAuth } from './firebase.js';
// import firebase from 'firebase/app';
// 認証周りやDB周りで必要なためimportしておく
import 'firebase/auth';
import 'firebase/database';

const Body = (props) => {
    const [error, setError] = useState('');
    const now = props.set;
    const callError = () => {
        setError('何らかのエラーが発生しました。');
        props.methodsForState(null);
    };
    const selectGame = (set) => {
        setError('');
        props.methodsForState(set);
    };
    if (now === null) {
        return (
            <div className="gameRoomWrapper">
                <div>{error}</div>
                <div className="gameRoomWrapper__button" onClick={() => selectGame('offline')}>
                    オフラインで遊ぶ
                </div>
                <div className="gameRoomWrapper__button" onClick={() => selectGame('online')}>
                    オンラインで遊ぶ
                </div>
            </div>
        );
    } else if (now === 'offline') {
        return <OfflineGame />;
    } else {
        return <OnlineGame callError={callError} />;
    }
};


const Room = (props) => {
    const [forState, setForState] = useState(null);
    const methodsForState = (set) => {
        setForState(set);
    };
    return (
        <div>
            <Header methodsForState={() => methodsForState(null)} />
            <Body methodsForState={(set) => methodsForState(set)} set={forState} />
        </div>
    );
};

// ========================================

ReactDOM.render(<Room />, document.getElementById('root'));