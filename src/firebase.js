import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// firebase 설정
const config = {
  apiKey: 'AIzaSyCHIqTNZgs16joWoQL0cFuxylsszUeJY0g',
  authDomain: 'react-fireabse-chatting.firebaseapp.com',
  databaseURL: 'https://react-fireabse-chatting.firebaseio.com',
  projectId: 'react-fireabse-chatting',
  storageBucket: 'react-fireabse-chatting.appspot.com',
  messagingSenderId: '8672500514',
};
firebase.initializeApp(config);

export default firebase;
