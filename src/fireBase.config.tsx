import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCtwP7PImpR7RSLyPzXB3zHeTQCRNj1r8g",
  authDomain: "desafio-03-aws-react-c454f.firebaseapp.com",
  projectId: "desafio-03-aws-react-c454f",
  storageBucket: "desafio-03-aws-react-c454f.firebasestorage.app",
  messagingSenderId: "545779525158",
  appId: "1:545779525158:web:00284f86326a006909a8e7",
  measurementId: "G-G67YDN3136"
};

export const app = initializeApp(firebaseConfig);