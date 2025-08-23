// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // esto lo agrego


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7Qu_z170hsZZkj2whNzKNPhM8kdzZGoo",
  authDomain: "emprenred-6f3df.firebaseapp.com",
  projectId: "emprenred-6f3df",
  storageBucket: "emprenred-6f3df.firebasestorage.app",
  messagingSenderId: "482631206029",
  appId: "1:482631206029:web:ccc170ce12f0f900310ec4",
  measurementId: "G-92CH3YYGLD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
// constante db que exporto para usar Firestore en otros archivos
// (esto lo agrego para poder usar Firestore en mi proyecto)        
// asi no tengo que importar Firestore en cada archivo donde lo use

