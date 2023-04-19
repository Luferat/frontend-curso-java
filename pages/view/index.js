$(document).ready(myView)

// Inicializa a variável de saída.
var article = author = authorArts = ''

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
<div>${art.content}</div>            
            `

            // Exibe na página.
            $('article').html(article)

            // Altera o título da página.
            changeTitle(art.title)

            // Obter dados do autor.
            $.get(app.apiUserURL + art.author)
                .done((user) => {
                    // console.log(user)

                    author = `
<div class="art-author">
    <img src="${user.photo}" alt="${user.name}">
    <h4>${user.name}</h4>
    <h5>${getAge(user.birth)} anos</h5>
    <p>${user.bio}</p>
</div>
                `

                    // Obtém todos os artigos deste autor.
                    $.get(app.apiArticleURL + `?author=${user.id}&_limit=5`)
                        .done((uArt) => {
                            authorArts += `<ul>`
                            uArt.forEach((data) => {
                                if (data.id != art.id) {
                                    authorArts += `<li><a href="view" data-id="${data.id}">${data.title}</a></li>`
                                }
                            });
                            authorArts += `</ul>`
                            $('aside').html(author + authorArts)
                        })
                        .fail()
                })
                .fail()

            // Caso a página não exista...
        }).fail((error) => {

            // Mostra a página 404.
            loadpage('e404', false)
        })

}