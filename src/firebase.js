import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB54qL7YMbH2S3dyqeqYTU4kB_k77FDYgw",
    authDomain: "shoppingapp-eae82.firebaseapp.com",
    databaseURL: "https://shoppingapp-eae82.firebaseio.com",
    projectId: "shoppingapp-eae82",
    storageBucket: "shoppingapp-eae82.appspot.com",
    messagingSenderId: "959919827845"
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseData = firebase.database().ref('items');