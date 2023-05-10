$(document).ready(myProfile)

function myProfile() {

    changeTitle('Perfil de usuário')

    // Monitora status de autenticação do usuário
    firebase.auth().onAuthStateChanged((user) => {

        // Se o usuário está logado...
        if (user) {

            // Formata e exibe o perfil na página, no elemento '<article>'.
            $('article').html(`

<div class="userProfile">

    <h2>Perfil do usuário</h2>
    <p>Seu perfil é gerenciado pelo Google.</p>

    <img src="${user.photoURL}" alt="${user.displayName}">
    <h3>${user.displayName}</h3>
    <ul>
        <li><strong>E-mail:</strong> ${user.email}</li>
        <li><strong>Cadastro:</strong> ${myDate.jsToBr(user.metadata.creationTime)}</li>
        <li><strong>Último login:</strong> ${myDate.jsToBr(user.metadata.lastSignInTime)}</li>
    </ul>

    <p>Clique no botão abaixo para ver/editar seu perfil.</p>
    <button id="googleProfile"><i class="fa-brands fa-google fa-fw"></i> Perfil no Google</button>

    <p>Clique no botão abaixo para sair do aplicativo neste dispositivo.
    Você precisará entrar novamente para ter acesso aos recursos restritos do site.</p>
    <button id="googleLogout"><i class="fa-solid fa-right-from-bracket fa-fw"></i> Sair / Logout</button>

    <div class="dzone">
        <div class="line"><hr></div>
        <div>&nbsp;DANGER ZONE!&nbsp;</div>
        <div class="line"><hr></div>
    </div>

    <p>Para remover sua conta deste aplicativo, acesse seu perfil do Google, localize e remova o aplicativo "<code>project-${firebaseConfig.messagingSenderId}</code>". 
    Lembre-se que o Google só compartilha seu nome público, seu endereço de e-mail e sua imagem de perfil pública com nosso site,
    significa que, normalmente, não é necessário remover as permissões deste aplicativo da sua conta por questões de privacidade.
    </p>

    <blockquote><em>Leia nossas <a href="policies">Políticas de privacidade</a> para saber mais.</em></blockquote>

    <p>Além disso, para ter acesso aos recursos restritos você terá que autorizar o aplicativo novamente e não terá acesso aos seus conteúdos da conta antiga.</p>

    <p>Se quiser remover mesmo assim, clique no botão abaixo para acessar a página de permissões:</p>
    <button id="googleRemove"><i class="fa-solid fa-user-lock fa-fw"></i> Aplicativos Conectados</button>
    <p>Em seguida, clique no botão [<i class="fa-solid fa-right-from-bracket fa-fw"></i> Sair / Logout] acima.</p>

</div>

            `)

            // Quando clicar no botão de perfil.
            $('#googleProfile').click(toProfile)

            // Quando clicar no botão de logout.
            $('#googleLogout').click(logout)

            // Quando clicar no botão de remover perfil.
            $('#googleRemove').click(remove)

            // Se não tem logados...
        } else {

            // Vai para a página inicial → home.
            loadpage('home')
        }
    });

}

// Acessa o perfil do usuário no Google.
function toProfile() {
    window.open('https://myaccount.google.com/', '_blank')
}

// Faz logout do usuário.
function logout() {
    firebase.auth().signOut()
    popUp({ type: 'alert', text: 'Você saiu do aplicativo.' })
    loadpage('home')
}

// Acessa as permissões de aplicativos do usuário no Google.
function remove() {
    window.open('https://myaccount.google.com/permissions', '_blank')
}
