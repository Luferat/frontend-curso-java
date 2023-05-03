/**
 * Scripts de View
 * By Luferat
 * MIT License
 * 
 * DEBUG By Jaydee.
 **/

$(document).ready(myView)

// Inicializa a variável de saída.
var article = author = authorArts = dateAuthor = cmtList = cmtUser = ''

// Função principal da página "user".
function myView() {

    // Obtém o id do artigo da sessão.
    const artId = sessionStorage.article

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
                                    authorArts += `<li><a href="view" data-id="${data.id}">${data.title}</a></li>`
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

            /**
             * Processa os comentários do artigo.
             **/

            // Obtém todos os comentários deste artigo
            $.get(app.apiCommentURL + '&article=' + artId)
                .done((cmts) => {
                    cmts.forEach((cmt) => {
                        cmtList += `
                            <div class="cmt-item">
                                <div class="dateAuthor">Por ${cmt.name} em ${cmt.date}</div>
                            </div>
                        `
                    })
                })
                .fail()

            // Caso a página não exista...
        }).fail((error) => {

            // Mostra a página 404.
            loadpage('e404', false)
        })

}