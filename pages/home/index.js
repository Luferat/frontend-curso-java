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

    $.get(app.apiArticlesURL)
        .done((data) => {

            data.forEach((art) => {

                console.log(
                    art.id,
                    art.thumbnail,
                    art.title,
                    art.resume
                )

            });

        })
}