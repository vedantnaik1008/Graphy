// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
console.log('Firebase Config:', {
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID
});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const database = getDatabase(app);
