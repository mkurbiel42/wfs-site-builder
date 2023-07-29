import {initializeApp, getApps} from "firebase/app"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_API_KEY,

//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,

//     projectId: process.env.FIREBASE_PROJECT_ID,

//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,

//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,

//     appId: process.env.FIREBASE_APP_ID,

//     measurementId: process.env.FIREBASE_MEASUREMENT_ID
// }

const firebaseConfig = {

    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

};


export let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export let firebaseAuth = getAuth(firebaseApp)
export let firestoreDB = getFirestore(firebaseApp)

export async function signIn(email, password){
    try{
        let result = await signInWithEmailAndPassword(firebaseAuth, email, password)
        return {result}
    }catch(error){
        return {error}
    }
}

export async function logOut(){
    try{
        await signOut(firebaseAuth)
        return {result: "SIGN_OUT_SUCCESSFUL"}
    }catch(error){
        return {error}
    }
}