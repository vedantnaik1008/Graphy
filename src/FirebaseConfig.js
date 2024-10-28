// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCAb5gpgX-7QE84sbJPzutfpvhU4XFf6aI',
    authDomain: 'graphy-c2078.firebaseapp.com',
    databaseURL:
        'https://graphy-c2078-default-rtdb.asia-southeast1.firebasedatabase.app/',
    projectId: 'graphy-c2078',
    storageBucket: 'graphy-c2078.appspot.com',
    messagingSenderId: '722934185275',
    appId: '1:722934185275:web:96af7e0ebeb9ea69234b1e',
    measurementId: 'G-9YYBZ5MXDF'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)
