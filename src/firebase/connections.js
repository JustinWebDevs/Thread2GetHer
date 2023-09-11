import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCcbBBlKzTmnwucwetPoktizeVNGoh2Uog",
  authDomain: "thread2gether-b0b77.firebaseapp.com",
  projectId: "thread2gether-b0b77",
  storageBucket: "thread2gether-b0b77.appspot.com",
  messagingSenderId: "735879433653",
  appId: "1:735879433653:web:eae74af7b84649d298ddfc",
  measurementId: "G-6ZSM6N3XWH"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);