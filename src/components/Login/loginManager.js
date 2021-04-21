  
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.isSignedIn = true;
            return newUserInfo;
        })
        .catch((error) => {

            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
            console.log(error.message);
            
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
        .then((res) => {
            // Signed in
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.isSignedIn = true;
            return newUserInfo;
        })
        .catch((error) => {
            var errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const handleSignOut = () => {
    return firebase.auth().signOut().then((res) => {
        const signOutuser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
        }
        return signOutuser;
    }).catch((error) => {
        // An error happened.
    });
}