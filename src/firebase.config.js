// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyACf4GF18YKWQVWiHMrzd2-v03QM92vr5o",
    authDomain: "furniture-e-commerce-ac7c8.firebaseapp.com",
    projectId: "furniture-e-commerce-ac7c8",
    storageBucket: "furniture-e-commerce-ac7c8.appspot.com",
    messagingSenderId: "125783190844",
    appId: "1:125783190844:web:2a06094e662a376bcb4239",
    measurementId: "G-K352H1FVT5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;