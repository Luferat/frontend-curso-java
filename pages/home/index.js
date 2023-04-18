$(document).ready(myHome)

/**
 * URL para obter todos os artigos ordenados pela data:
 * http://localhost:3000/articles?_sort=date&_order=desc
 */

/**
 * Função principal da página "home".
 **/
function myHome() {
    /**
     * Altera o título da página quando 'home' for acessada.
     **/
    changeTitle()

    /**
     * Obtém todos os artigos do site, orneados pela data, descrecente.
     */
    $.get(app.apiArticlesURL)

        // Armazena os artigos obtidos em "data".
        .done((data) => {

            // Extrai cada um dos artigos para o objeto "art".
            data.forEach((art) => {

                // Exibe os dados.
                console.log(
                    art.id,
                    art.thumbnail,
                    art.title,
                    art.resume
                )

            });

        })
}