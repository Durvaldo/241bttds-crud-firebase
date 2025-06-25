import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBGNidC6UIv71pqxEnqqapTTLgddtbX8h4',
  authDomain: 'bttds-5fcd8.firebaseapp.com',
  projectId: 'bttds-5fcd8',
  storageBucket: 'bttds-5fcd8.firebasestorage.app',
  messagingSenderId: '112145536125',
  appId: '1:112145536125:web:5567f87a58186556960d14',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
