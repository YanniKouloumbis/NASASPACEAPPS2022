import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/analytics";
import "firebase/performance";
const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if(!firebase.apps.length){
    firebase.initializeApp(clientCredentials);
    if (typeof window !== 'undefined') {
        if ('measurementId' in clientCredentials) {
            firebase.analytics()
            firebase.performance()
        }
    }
}

//if user is not signed in, sign in anonymously
firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        firebase.auth().signInAnonymously();
        console.log("SIGNED IN")
    }
}
)

export default firebase;