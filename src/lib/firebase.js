import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBONq8-BiSV97gpQvLLiQBQk3oKuk9BEWw",
    authDomain: "luca-development.firebaseapp.com",
    databaseURL:
        "https://luca-development-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "luca-development",
    storageBucket: "luca-development.appspot.com",
    messagingSenderId: "817736647251",
    appId: "1:817736647251:web:cba7f5e2ce2c3c2ad8bca6",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
