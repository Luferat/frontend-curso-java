/**
 * Configuração do Firebase
 * By Luferat
 * MIT License 
 **/

// Configurações so Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBicr7VwgcQfN5aclocvQ846BN4Z2k7NH0",
    authDomain: "frontendeiros2.firebaseapp.com",
    projectId: "frontendeiros2",
    storageBucket: "frontendeiros2.appspot.com",
    messagingSenderId: "933890671722",
    appId: "1:933890671722:web:7ade7d8b3161ce39d93613"
};

// Incializa o Firebase
firebase.initializeApp(firebaseConfig);

// Incializa o Firebase Authentication
const auth = firebase.auth();

// Define o provedor de autenticação
var provider = new firebase.auth.GoogleAuthProvider();