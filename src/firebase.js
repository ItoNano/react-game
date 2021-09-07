import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

// Firestoreのインスタンス作成
export const firebaseStore = firebaseApp.firestore();

export default firebase;