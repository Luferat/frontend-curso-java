/**
 * FrontEndeiros 1.0
 * /index.js - Aplicativo principal
 * By Luferat
 * MIT License 2023 
 **/

// Configuração do ambiente.
const app = {
    siteName: 'FrontEndeiros',
    siteSlogan: 'Programando para o futuro',
    apiBaseURL: 'https://myfeapi.onrender.com/'
}

// Chama aplicativo principal.
$(document).ready(myApp)

// Aplicativo principal.
function myApp() {

    // Aceite de cookies.
    if (cookie.get('acceptCookies') == 'on')
        $('#aboutCookies').hide()
    else $('#aboutCookies').show()

    // Monitor de usuário logado.
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            $('#navUser').html(`<img src="${user.photoURL}" alt="${user.displayName}" referrerpolicy="no-referrer"><span>Perfil</span>`)
            $('#navUser').attr('href', 'profile')
        } else {
            $('#navUser').html(`<i class="fa-solid fa-user fa-fw"></i><span>Login</span>`)
            $('#navUser').attr('href', 'login')
        }
    });

    // Carrega a página à partir de rotas diretas.
    if (sessionStorage.path == undefined) sessionStorage.path = 'home'
    path = sessionStorage.path
    delete sessionStorage.path
    loadpage(path)

    // Tratamento de eventos.
    $(document).on('click', 'a', routerLink)
    $(document).on('click', '.article', loadArticle)
    $('#policies').click(() => { loadpage('policies') })
    $('#accept').click(() => {
        cookie.set('acceptCookies', 'on', 365)
        $('#aboutCookies').hide()
    })

}

// Login do Firebase Authenticator.
function fbLogin() {
    // firebase.auth().signInWithPopup(provider)
    firebase.auth().signInWithRedirect(provider)
        .then((user) => {
            popUp({ type: 'success', text: `Olá ${user.user.displayName}!` })
            loadpage(location.pathname.split('/')[1])
        })
        .catch((error) => {
            try {
                popUp({ type: 'error', text: 'Ooops! Popups estão bloqueados!<br>Por favor, libere-os!' })
            } catch (e) {
                alert('Ooops! Popups estão bloqueados!\nPor favor, libere-os!')
            }
        })
}

// Processa rotas.
function routerLink() {

    // Obtém e sanitiza a rota do elemento clicado.
    var href = $(this).attr('href').trim().toLowerCase()

    // Âncora para o topo da página.
    if (href == '#top') {
        window.scrollTo(0, 0)
        return false
    }

    // Links externos.
    if (
        href.substring(0, 7) == 'http://' ||
        href.substring(0, 8) == 'https://' ||
        href.substring(0, 4) == 'tel:' ||
        href.substring(0, 7) == 'mailto:'
    )
        return true

    // Links de login.
    if (href == 'login') {
        fbLogin()
        return false
    }

    // Carrega a rota na SPA.
    loadpage(href)
    return false
}

// Carrega a página da rota na SPA.
function loadpage(page, updateURL = true) {

    // Caminhos dos componentes da página à partir da rota.
    const path = {
        html: `pages/${page}/index.html`,
        css: `pages/${page}/index.css`,
        js: `pages/${page}/index.js`
    }

    // Obtém componentes HTML, CSS e JS da página.
    $.get(path.html)
        .done((data) => {
            if (data.trim().substring(0, 9) != '<article>')
                loadpage('e404', false)
            else {
                $('#pageCSS').attr('href', path.css)
                $('main').html(data)
                $.getScript(path.js)
            }
        })
        .catch(() => {
            loadpage('e404', false)
        })

    // Rola a tela para o início da página.
    window.scrollTo(0, 0);

    // Atualiza URL da página com o endereço da rota.
    if (updateURL) window.history.pushState({}, '', page);

}

// Muda o título da página → <title></title>
function changeTitle(title = '') {
    let pageTitle = app.siteName + ' - '
    if (title == '') pageTitle += app.siteSlogan
    else pageTitle += title
    $('title').html(pageTitle)
}

// Calcula a idade com base na data.
function getAge(sysDate) {
    // Obtendo partes da data atual.
    const today = new Date()
    const tYear = today.getFullYear()
    const tMonth = today.getMonth() + 1
    const tDay = today.getDate()

    // Obtendo partes da data original.
    const parts = sysDate.split('-')
    const pYear = parts[0]
    const pMonth = parts[1]
    const pDay = parts[2]

    // Calcula a idade pelo ano.
    var age = tYear - pYear

    // Verificar o mês e o dia.
    if (pMonth > tMonth || pMonth == tMonth && pDay > tDay) age--

    // Retorna a idade.
    return age
}

// Carrega o artigo completo.
function loadArticle() {
    sessionStorage.article = parseInt($(this).attr('data-id'))
    loadpage('view')
}

// Sanitiza um texto, removendo todas as tags HTML.
function stripHTML(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

// Exibe um banner popup.
// Parâmetros → type: String, text: String, time: Seconds
function popUp(pData) {

    var pStyle = ''
    switch (pData.type) {
        case 'error': pStyle = 'background-color: #f00; color: #fff'; break
        case 'alert': pStyle = 'background-color: #ff0; color: #000'; break
        case 'success': pStyle = 'background-color: #0f0; color: #000'; break
        default: pStyle = 'background-color: #fff; color: #000'
    }

    $('body').prepend(`
        <div id="popup">
            <style>
                #popup { position: fixed; top: 0; left: 0; width: 100%; background-color: rgba(0, 0, 0, .5); z-index: 100; padding: 1rem; display: flex; align-items: center; justify-content: center; }
                .popup-body { margin: auto; padding: .5rem .5rem .5rem 1rem; display: flex; align-items: center; justify-content: center; border-radius: .3rem; }
                .popup-close { font-size: 1.5rem; margin-left: 1rem; }
            </style>  
            <div class="popup-body" style="${pStyle}">
                <div class="popup-text">${pData.text}</div>
                <div class="popup-close"><i class="fa-solid fa-xmark fa-fw"></i></div>
            </div>
        </div>
        `)

    // Eventos do banner
    var t = setTimeout(() => {
        $('#popup').remove()
        clearTimeout(t)
    }, parseInt(pData.time) || 3000)
    $('#popup').click(() => {
        $('#popup').remove()
        clearTimeout(t)
    })

}

// Tratamento de datas.
const myDate = {
    // System Date para pt-BR Date.
    sysToBr: (systemDate, time = true) => {
        var parts = systemDate.split(' ')[0].split('-')
        var out = `${parts[2]}/${parts[1]}/${parts[0]}`
        if (time) out += ` às ${systemDate.split(' ')[1]}`
        return out
    },
    // JavaScript para pt-BR date.
    jsToBr: (jsDate, time = true) => {
        var theDate = new Date(jsDate)
        var out = theDate.toLocaleDateString('pt-BR')
        if (time) out += ` às ${theDate.toLocaleTimeString('pt-BR')}`
        return out
    },
    // Today JavaScript para syste date.
    todayToSys: () => {
        const today = new Date()
        return today.toISOString().replace('T', ' ').split('.')[0]
    }

}

// Implementa a instrução String.truncate(length).
String.prototype.truncate = String.prototype.truncate ||
    function (n, useWordBoundary) {
        if (this.length <= n) { return this; }
        const subString = this.slice(0, n - 1);
        return (useWordBoundary
            ? subString.slice(0, subString.lastIndexOf(" "))
            : subString) + "&hellip;";
    };

// Tratamento de cookies.
const cookie = {
    set: (cname, cvalue, exdays) => {
        const d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        let expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    },
    get: (cname) => {
        let name = cname + '='
        let decodedCookie = decodeURIComponent(document.cookie)
        let ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') c = c.substring(1)
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
        }
        return ''
    }
}

// Obtém a lista de colaboradores da plataforma, da API.
function getUsersTeam(limit) {
    var htmlOut = ''
    $.get(app.apiBaseURL + 'users', {
        status: 'on',
        _sort: 'name',
        _order: 'asc',
        _limit: limit || 999
    })
        .done((data) => {
            data.forEach((item) => {
                var type
                switch (item.type) {
                    case 'admin': type = 'Administrador(a)'; break
                    case 'author': type = 'Autor(a)'; break
                    case 'moderator': type = 'Moderador(a)'; break
                    default: type = 'Colaborador(a)'
                }

                htmlOut += `
                    <div class="userclick users-grid-item" data-id="${item.id}">
                        <img src="${item.photo}" alt="${item.name}">
                        <h4>${item.name.split(' ')[0]}</h4>
                        <small>${item.name}</small>
                        <ul>
                            <li>${getAge(item.birth)} anos</li>
                            <li>${type}
                        </ul>
                    </div>
                `
            })
            $('#usersGrid').html(htmlOut)
            $('.userclick').click(openProfile)

        })

}

// Abre o perfil de um colaborador.
function openProfile() {
    const userId = parseInt($(this).attr('data-id'))
    sessionStorage.userId = userId
    loadpage('aboutus')
}
