/* eslint-disable import/no-duplicates */
// import firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.API_KEY, // for auth
  authDomain: process.env.AUTH_DOMAIN, // for auth
  projectId: process.env.PROJECT_ID, // for auth
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// if a Firebase instance doesn't exist, create one
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const { serverTimestamp } = firebase.firestore.FieldValue;
export const { fromMillis } = firebase.firestore.Timestamp;
export const { increment } = firebase.firestore.FieldValue;

// Storage exports
export const storage = firebase.storage();
export const { STATE_CHANGED } = firebase.storage.TaskEvent;
