/**
 * Scripts de View
 * By Luferat
 * MIT License
 * 
 * DEBUG By Jaydee.
 **/

$(document).ready(myView)

// Inicializa a variável de saída.
var article = author = authorArts = dateAuthor = cmtList = cmtForm = artId = ''
var userData;

// Função principal da página "user".
function myView() {

    // Obtém o id do artigo da sessão.
    artId = sessionStorage.article

    // Apaga id do artigo da sessão.
    // delete sessionStorage.article

    // Obtém o artigo da API, pelo ID.
    $.get(app.apiArticleURL + artId)

        // Armazena o artigo em 'art'.
        .done((art) => {

            // Monta a view (HTML do artigo).
            article += `
<h2>${art.title}</h2>
<small id="dateAuthor" class="dateAuthor"></small>
<div>${art.content}</div>
&nbsp;<hr class="sep">
<h3 class="comt-title">Comentários</h3>
<div id="commentForm"></div>
<div id="commentList"></div>   
            `

            // Exibe na página.
            $('article').html(article)

            // DEBUG → Evita repetição do artigo.
            article = ''

            // Altera o título da página.
            changeTitle(art.title)

            // Atualiza o contador de visitas do artigo.
            $.ajax({
                type: 'PATCH',
                url: app.apiArticleURL + artId,
                data: { views: parseInt(art.views) + 1 }
            });

            // Obter dados do autor.
            $.get(app.apiUserURL + art.author)
                .done((user) => {
                    // console.log(user)

                    // Obtém e formata a data do artigo.
                    var parts = art.date.split(' ')[0].split('-')
                    var date = `${parts[2]}/${parts[1]}/${parts[0]} às ${art.date.split(' ')[1]}`

                    // Formata o subtítulo do artigo.
                    $('#dateAuthor').html(`<span>Por ${user.name}&nbsp;</span><span>em ${date}.</span>`)

                    author = `
<div class="art-author">
    <img src="${user.photo}" alt="${user.name}">
    <h3>${user.name}</h3>
    <h5>${getAge(user.birth)} anos</h5>
    <p>${user.bio}</p>
</div>
                    `

                    // Obtém todos os artigos deste autor.
                    $.get(app.apiArticleURL + `?author=${user.id}&_limit=5&status=on`)
                        .done((uArt) => {
                            authorArts += `
                            <h3><i class="fa-solid fa-plus fa-fw"></i> Artigos</h3>
                            <ul class="autor-art-list">
                            `
                            uArt.forEach((data) => {
                                if (data.id != art.id) {
                                    authorArts += `<li class="art-item" data-id="${data.id}">${data.title}</li>`
                                }
                            });
                            authorArts += `</ul>`
                            $('aside').html(author + authorArts)

                            // DEBUG → Evita repetição dos artigos do autor.
                            authorArts = ''
                        })
                        .fail()
                })
                .fail()

            // Mostra o formulário de comentário.
            getCommentForm()

            // Exibe todos os comentários deste artigo.
            getComments(artId)

            // Caso a página não exista...
        }).fail((error) => {

            // Mostra a página 404.
            loadpage('e404', false)
        })

}

/**
 * Envia comentário.
 **/
function sendComment(event) {

    // Evita ação normal do HTML. Não envia o formulário.
    event.preventDefault()

    // Obtém o comentário do formulário, sanitizando o conteúdo.
    var content = stripHtml($('#txtContent').val().trim())

    // Escreveo conteúdo sanitizado no campo.
    $('#txtContent').val(content)

    // Se o conteúdo é vazio, não faz nada.
    if (content == '') {
        // alert('Seu comentário está vazio!')
        return false
    }

    // Obtém a data atual do sistema.
    const today = new Date()

    // Formata a data para 'system date' (aaaa-mm-dd hh:ii:ss).
    sysdate = today.toISOString().replace('T', ' ').split('.')[0]

    // Monta o objeto de requisição para a API.
    const formData = {
        name: userData.displayName,
        photo: userData.photoURL,
        email: userData.email,
        uid: userData.uid,
        article: artId,
        content: content,
        date: sysdate,
        status: 'on'
    }

    // Envia dados para a API.
    $.post(app.apiCommentPostURL, formData)
        .done((data) => {
            if (data.id > 0) {
                alert('Seu comentário foi enviado com sucesso!')
                loadpage('view')
            }
        })
        .fail((err) => {
            console.error(err)
        })
}

/**
 * Exibe formulário de comentário se usuário está logado.
 **/
function getCommentForm() {

    // Monitora status de autenticação do usuário
    firebase.auth().onAuthStateChanged((user) => {

        // Se o usuário está logado...
        if (user) {

            // Armazena os dados do usuário logado na global 'userData'.
            userData = user

            // Monta o formulário de comentários.
            cmtForm = `
<div class="cmtUser">Comentando como <em>${user.displayName}</em>:</div>
<form method="post" id="formComment" name="formComment">
    <textarea name="txtContent" id="txtContent">Comentário fake para testes</textarea>
    <button type="submit">Enviar</button>
</form>
            `

            // Se não tem logados...
        } else {

            // Monta mensagem pedindo para logar.
            cmtForm = `<p class="center">Logue-se para comentar.</p>`
        }

        $('#commentForm').html(cmtForm)
        cmtForm = ''

        // Monitora envio do formulário.
        $('#formComment').submit(sendComment)
    });

}

/**
 * Obtém todos os comentários deste artigo.
 **/
function getComments(artId) {

    // Obtém todos os comentários deste artigo
    $.get(app.apiCommentURL + '&article=' + artId)
        .done((cmts) => {

            // Se tem comentários.
            if (cmts.length > 0) {

                cmts.forEach((cmt) => {

                    // Obtém e formata a data do artigo.
                    var parts = cmt.date.split(' ')[0].split('-')
                    var date = `${parts[2]}/${parts[1]}/${parts[0]} às ${cmt.date.split(' ')[1]}`

                    // Substitui quebras de linha (\n) pela tag <br> no conteúdo.
                    var content = cmt.content.split("\n").join("<br>")

                    cmtList += `
<div class="cmt-item">
    <small class="dateAuthor"><span>Por ${cmt.name}&nbsp;</span><span>em ${date}</span></small>
    <div class="cmtContent">${content}</div>
</div>
                    `
                })

            } else {
                cmtList = `<p class="center">Nenhum comentário.<br>Seja a(o) primeira(o) a comentar!</p>`
            }

            $('#commentList').html(cmtList)
            cmtList = ''
        })
        .fail()

}
