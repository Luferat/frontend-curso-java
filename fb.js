/**
 * Integração com o Firebase.com
 * By Luferat
 * MIT License
 **/

// Configuração do Firebase.Z
const firebaseConfig = {
    apiKey: "AIzaSyBicr7VwgcQfN5aclocvQ846BN4Z2k7NH0",
    authDomain: "frontendeiros2.firebaseapp.com",
    projectId: "frontendeiros2",
    storageBucket: "frontendeiros2.appspot.com",
    messagingSenderId: "933890671722",
    appId: "1:933890671722:web:7ade7d8b3161ce39d93613"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
