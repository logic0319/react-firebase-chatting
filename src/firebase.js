import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// firebase 설정
const config = {
  apiKey: 'AIzaSyAHP6AbYkY0y3wJdgXXniWpyPOcwF_SE1g',
  authDomain: 'react-chatting.firebaseapp.com',
  databaseURL: 'https://react-chatting.firebaseio.com',
  projectId: 'react-chatting',
  storageBucket: 'react-chatting.appspot.com',
  messagingSenderId: '508160967758',
};
firebase.initializeApp(config);

export default firebase;
