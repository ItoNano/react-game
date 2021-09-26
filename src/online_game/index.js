import { useState} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import OnlineGame from './OnlineGame'
const Online = (props) => {
    const [firebaseData, setFirebaseData] = useState({
        gameStatus: 'select',
        roomId: 0,
        enterId: '',
        errorMessage: '',
        hostId: 0,
        guestId: 0,
        ref: null,
    });
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
    const roomName = process.env.REACT_APP_MODE !== 'local'? 'room' : 'develop'
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const selectRoom = (set) => {
        setFirebaseData((state) => ({ ...state, gameStatus: set }));
    };
    const createRoom = async () => {
        let id = String(Math.random()).substr(2, 8).substr(4);
        const hostId = String(Math.random()).substr(2, 8);
        setFirebaseData((state) => ({ ...state, hostId: hostId }));
        const ref = firebase.database().ref(roomName + '/' + id);
        const snapshot = await ref.once('value');
        if (snapshot.val()) {
            createRoom();
            return;
        }
        setFirebaseData((state) => ({ ...state, roomId: id }));
        const today = new Date();
        ref.set({
            timestamp: today.toLocaleString(),
            hostId: hostId,
            guestId: 0,
            gameState: '',
        });
        setFirebaseData((state) => ({ ...state, gameStatus: 'wait' }));
        const wait = firebase.database().ref(roomName + '/' + id + '/guestId')
        wait.on('value', (snapshot) => {
            const rootList = snapshot.val();
            if (rootList !== 0) {
                setFirebaseData((state) => ({ ...state, gameStatus: 'game' }));
                wait.off();
            }
        });
    };
    const enterRoom = async (e) => {
        e.preventDefault();
        if (firebaseData.enterId.length !== 4) {
            firebaseData.errorMessage = 'idは4文字でよろしく';
            setFirebaseData((state) => ({ ...state, enterId: '' }));
            return;
        } else {
            const ref = firebase.database().ref(roomName + '/' + firebaseData.enterId);
            const snapshot = await ref.once('value');
            const sync = snapshot.val();
            if (!sync) {
                firebaseData.errorMessage = 'そんなルームありません';
                return;
            } else if (sync.guest) {
                firebaseData.errorMessage = '既に満員';
                return;
            }
            setFirebaseData((state) => ({ ...state, roomId: firebaseData.enterId }));
            let count = 0;
            let guestId = 0;
            do {
                guestId = String(Math.random()).substr(2, 8);
            } while (guestId === sync.host && count < 5);
            if (count === 5) {
                firebaseData.errorMessage = 'もう一回入力して';
                setFirebaseData((state) => ({ ...state, enterId: '' }));
                return;
            }
            setFirebaseData((state) => ({ ...state, guestId: guestId }));
            ref.update({
                guestId: guestId,
            });
            setFirebaseData((state) => ({ ...state, gameStatus: 'game' }));
        }
    };
    const handleChange = (e) => {
        setFirebaseData((state) => ({ ...state, enterId: e.target.value }));
    };
    if (firebaseData.gameStatus === 'select') {
        return (
            <div className="gameRoomWrapper">
                <div className="gameRoomWrapper__button" onClick={createRoom}>
                    ルームを作成
                </div>
                <div className="gameRoomWrapper__button" onClick={() => selectRoom('enter')}>
                    ルームに入る
                </div>
            </div>
        );
    } else if (firebaseData.gameStatus === 'enter') {
        return (
            <form onSubmit={enterRoom}>
                <div className="gameRoomWrapper">
                    <div>{firebaseData.errorMessage}</div>
                    <input className="gameRoomWrapper__form" type="number" name="id" maxLength="4" value={firebaseData.enterId} onChange={handleChange} />
                    <button className="gameRoomWrapper__button" type="submit">
                        room idを入力
                    </button>
                </div>
            </form>
        );
    } else if (firebaseData.gameStatus === 'wait') {
        return(
            <div className="gameRoomWrapper">
                <div className="gameRoomWrapper__text">RoomId: {firebaseData.roomId}</div>
                <div className="gameRoomWrapper__text">相手が来るまでお待ちください</div>
            </div>
        )
    } else {
        const user = firebaseData.hostId !== 0 ? "host": "guest";
        return <OnlineGame roomId={firebaseData.roomId} user={user} />;
    }
};

export default Online;