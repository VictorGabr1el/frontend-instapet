import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxp1oTRGFYpoAmyT7JFpT61hKtFwyIfiE",
  authDomain: "instapet-8ec04.firebaseapp.com",
  databaseURL: "https://instapet-8ec04-default-rtdb.firebaseio.com",
  projectId: "instapet-8ec04",
  storageBucket: "instapet-8ec04.appspot.com",
  messagingSenderId: "327292956035",
  appId: "1:327292956035:web:9e502e30b29c5161469ab6",
  measurementId: "G-JFY99ZSCXK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
