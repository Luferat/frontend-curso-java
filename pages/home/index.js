$(document).ready(myHome)

/**
 * URL para obter todos os artigos ordenados pela data:
 * http://localhost:3000/articles?_sort=date&_order=desc
 **/

/**
 * Função principal da página "home".
 **/
function myHome() {

    /**
     * Altera o título da página quando 'home' for acessada.
     **/
    changeTitle()

    // Armazenará a lista de artigos.
    var articleList = '';

    /**
     * Obtém todos os artigos do site, orneados pela data, descrecente.
     **/
    $.get(app.apiArticlesURL)

        // Armazena os artigos obtidos em "data".
        .done((data) => {

            // Extrai cada um dos artigos para o objeto "art".
            data.forEach((art) => {

                // Gera conteúdo HTML com a listagem de artigos.
                articleList += `
                    <div class="art-item" data-id="${art.id}">
                        <img src="${art.thumbnail}" alt="${art.title}">
                        <div>
                            <h3>${art.title}</h3>
                            <p>${art.resume}</p>
                        </div>
                    </div>                    
                ` 
            })

            // Exibe a lista de artigos na 'home'.
            $('#artList').html(articleList)
        })
        .fail((error) => {
            $('#artList').html('Não encontramos nenhum artigo!!!')
        })

}

