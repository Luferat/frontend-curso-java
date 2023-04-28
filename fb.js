/**
 * Integração com o Firebase.com
 * By Luferat
 * MIT License
 **/

// Importa o "core" do Firebase.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";

// Importa o Authentication do Firebase.
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// Configuração do Firebase para o site do prof. Luferat.
// NÃO USE ESTE CÓDIGO NO SEU APLICATIVO.
const firebaseConfig = {
    apiKey: "AIzaSyDk2880c2er1Y3j1uq1IFrPln_YSJo18fs",
    authDomain: "frontendeiros.firebaseapp.com",
    projectId: "frontendeiros",
    storageBucket: "frontendeiros.appspot.com",
    messagingSenderId: "197552479848",
    appId: "1:197552479848:web:69018f3bb5b7d65a92e5dd"
};

// Initializa o Firebase.
const fbapp = initializeApp(firebaseConfig);

// Inicializa o mecanismo de autenticação.
const auth = getAuth();

// Especifica o provedor de autenticação.
const provider = new GoogleAuthProvider();

// Observa o status de autenticação do usuário.
onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
        sessionStorage.userData = JSON.stringify({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uid: user.uid,
            created: user.metadata.createdAt,
            lastLogin: user.metadata.lastLoginAt 
        })
    } else {
        delete sessionStorage.userData
    }
});

// Executa a jQuery quando o documento estiver pronto.
$(document).ready(myFirebase)

function myFirebase() {

    // Detecta cliques no botão de login.
    $('#navUser').click(login)
}

// Função que processa cliques no botão login/profile.
function login() {

    // Se não está logado...
    if (!sessionStorage.userData) {

        // Faz login usando popup.
        signInWithPopup(auth, provider)

            // Se logou corretamente.
            .then(() => {

                // Redireciona para a 'home'.
                location.href = '/home'
            })

        // Se está logado..
    } else

        // Redireciona para 'profile'.
        location.href = '/profile'

    return false
}