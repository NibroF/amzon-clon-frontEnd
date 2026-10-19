
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyATf_7BJrdiqYNj9g2vlLJOmYLgg39GzQ8",
  authDomain: "clone-5461e.firebaseapp.com",
  projectId: "clone-5461e",
  storageBucket: "clone-5461e.firebasestorage.app",
  messagingSenderId: "974603830156",
  appId: "1:974603830156:web:c790038f69ed43a038cca9",
  measurementId: "G-L5CQVSZB10"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const db=getFirestore(app)