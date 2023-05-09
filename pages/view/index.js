/**
 * Article View
 * Página que apresenta um artigo completo com todo o conteúdo e metadados 
 * deste.
 * 
 * By Luferat - https://github.com/Luferat
 * MIT License
 **/

// "Roda" o aplicativo 'myView' quando o documento estiver pronto.
$(document).ready(myView)

/**
 * Aplicativo principal de 'view'.
 **/
function myView() {

    // Obtém o 'id' do artigo a ser apresentado do 'sessionStorage' do navegador.
    const articleId = parseInt(sessionStorage.article)

    // Se o 'id' não contém um número, mostra a página '404'.
    if (isNaN(articleId)) loadpage('e404')

    // Obtém o artigo completo da API, filtrando pelo 'id' e 'status'.
    $.get(app.apiBaseURL + 'articles', { id: articleId, status: 'on' })

        // Quando a API responder...
        .done((data) => {

            // Se não obteve um artigo apenas, mostra a página '404'. 
            if (data.length != 1) loadpage('e404')

            // Armazena o artigo em 'artData' para facilitar a manipulação.
            artData = data[0]

            // Mostra o título do artigo no navegador.
            changeTitle(artData.title)

            // Mostra o título do artigo na view.
            $('#artTitle').html(artData.title)

            // Mostra o conteúdo do artigo na view.
            $('#artContent').html(artData.content)

            // Atualiza o quantidade de visualizações do artigo.
            updateViews(artData)

            // Consulta na API sobre o autor do artigo.
            getAuthorData(artData)

            // Consulta na API sobre outros artigos do autor do artigo.
            getAuthorArticles(artData)

            // Exibe o formulário de comentários se o usuário está logado.
            getUserCommentForm(artData)

            // Consulta na API sobre os comentários para este artigo.
            getArticleComments(artData)
        })

        // Se a API não responder...
        .fail((error) => {

            // Exibe um popup informando o erro.
            popUp({ type: 'error', text: 'Artigo não encontrado!' })

            // Mostra a página '404'.
            loadpage('e404')
        })

}

/**
 * Consulta a API sobre o autor do artigo atual.
 * O parâmetro 'artData' contém o artigo completo na forma de objeto.
 * Essa função exibe os resultados diretamente na 'view' e não tem retorno.
 **/
function getAuthorData(artData) {

    // Obtém os dados do autor da API, usando o 'id' do mesmo.
    $.get(app.apiBaseURL + 'users/' + artData.author)

        // Quando a API responder...
        .done((userData) => {

            // Inicializa a lista de redes sociais do autor.
            var socialList = ''

            // Se a chave 'social' tem conteúdo...
            if (Object.keys(userData.social).length > 0) {

                // Inicia uma lista não ordenada.
                socialList = '<ul class="social-list">'

                // Itera a lista de redes sociais na variável 'social'.
                for (const social in userData.social) {

                    /**
                     * Monta o item de lista com a rede social atual onde, a 
                     * chave obtida é o label e o valor dessa chave e o link da
                     * rede social, no formato:
                     *     <li><a href="key.value" ...>key.name</a></li>
                     **/
                    socialList += `<li><a href="${userData.social[social]}" target="_blank">${social}</a></li>`
                }

                // Fecha a lista não ordenada.
                socialList += '</ul>'
            }

            /**
             * Observação: se a chave 'social' não tem conteúdo, 'socialList' será vazia!
             **/

            // Exibe os metadados do artigo atual na view.
            $('#artMetadata').html(`
                <span>Por ${userData.name}</span>
                <span>em ${myDate.sysToBr(artData.date)}.</span>
            `)

            // Exibe os dados do autor do artigo na view.
            $('#artAuthor').html(`
                <img src="${userData.photo}" alt="${userData.name}">
                <h3>${userData.name}</h3>
                <h5>${getAge(userData.birth)} anos</h5>
                <p>${userData.bio}</p>
                ${socialList}
            `)
        })

        // Se a API não responder...
        .fail((error) => {

            // Exibe uma mensagem de erro no console
            console.error(error)

            // loadpage('e404')
        })
}

/**
 * Obtém uma lista de artigos do mesmo autor.
 * O parâmetro 'artData' contém o artigo completo na forma de objeto.
 * O parâmetro 'limit' é opcional e contém a quantidade de artigos obtidos. Se
 * omitido, por padrão (default), retorna 5 artigos.
 * Essa função exibe os resultados diretamente na 'view' e não tem retorno.
 */
function getAuthorArticles(artData, limit) {

    // Obtém a lista de artigos da API usando os filtros...
    $.get(app.apiBaseURL + 'articles', {
        author: artData.author, // ... autor do artigo atual
        status: 'on',           // ... status 'on'
        id_ne: artData.id,      // ... ignora o artigo atual pelo 'id'
        _limit: limit || 5      // ... limita a quantidade de artigos obtidos
    })

        // Quando a API responder...
        .done((artsData) => {

            // Se obteve pelo menos um artigo...
            if (artsData.length > 0) {

                // Monta a lista de artigos para a view.
                var output = '<h3><i class="fa-solid fa-plus fa-fw"></i> Artigos</h3><ul>'

                // Embaralha os artigos de forma aleatória.
                var rndData = artsData.sort(() => Math.random() - 0.5)

                // Itera cada artigo, aramzenando em 'artItem'.
                rndData.forEach((artItem) => {

                    // Monta o artigo em um item de lista.
                    output += `<li class="art-item" data-id="${artItem.id}">${artItem.title}</li>`
                });

                // Fecha a lista,
                output += '</ul>'

                // Mostra a lista a view.
                $('#authorArtcicles').html(output)
            }
        })

        // Se a API não responder...
        .fail((error) => {

            // Exibe uma mensagem de erro no console
            console.error(error)

            // loadpage('e404')
        })

}

/**
 * Obtém todos os comentários do artigo da API.
 * O parâmetro 'artData' contém o artigo completo na forma de objeto.
 * O parâmetro 'limit' é opcional e contém a quantidade de comentários obtidos.
 * Se 'limit' for omitido, por padrão (default), retorna 999 comentários.
 * Essa função exibe os resultados diretamente na 'view' e não tem retorno.
 **/
function getArticleComments(artData, limit) {

    // Inicializa a lista de comentários.
    var commentList = ''

    // Obtém os comentários da API usando os filtros...
    $.get(app.apiBaseURL + 'comments', {
        article: artData.id,  // ... 'id' do artigo
        status: 'on',         // ... 'status' é 'on'
        _sort: 'date',        // ... ordenados pela 'date'
        _order: 'desc',       // ... ordem decrescente
        _limit: limit || 999  // ... limita a quantidade de comentários obtidos
    })

        // Quando a API responder...
        .done((cmtData) => {

            // Se obteve comentários...
            if (cmtData.length > 0) {

                // Itera cada comentário obtido e armazena em 'cmt'.
                cmtData.forEach((cmt) => {

                    // Troca as quebras de linha literais (\n) por quebras de linha HTML (<br>).
                    var content = cmt.content.split("\n").join("<br>")

                    // Monta a view de cada comentário.
                    commentList += `
                        <div class="cmtBox">
                            <div class="cmtMetadata">
                                <img src="${cmt.photo}" alt="${cmt.name}" referrerpolicy="no-referrer">
                                <div class="cmtMetatexts">
                                    <span>Por ${cmt.name}</span><span>em ${myDate.sysToBr(cmt.date)}.</span>
                                </div>
                            </div>
                            <div class="cmtContent">${content}</div>
                        </div>
                    `
                })

                // Se não obteve comentários...
            } else {

                // Gera a view sobre.
                commentList = '<p class="center">Nenhum comentário!<br>Seja o primeiro a comentar...</p>'
            }

            // Exibe a lista de comentários ou o aviso 'sem comentários' na view.
            $('#commentList').html(commentList)
        })

        // Se a API não responder...
        .fail((error) => {

            // Exibe uma mensagem de erro no console
            console.error(error)

            // loadpage('e404')
        })

}

/**
 * Se tem um usuário logado no front-end, exibe o formulário de comentários.
 * O parâmetro 'artData' contém o artigo completo na forma de objeto.
 * Essa função exibe os resultados diretamente na 'view' e não tem retorno.
 **/
function getUserCommentForm(artData) {

    // Inicializa a view do formulário.
    var cmtForm = ''

    // Monitora se tem usuário logado. Essa função é assíncrona, um 'observer'.
    firebase.auth().onAuthStateChanged((user) => {

        // Se tem usuário logado...
        if (user) {

            // Monta a view com o formulário de contatos.
            cmtForm = `
                <div class="cmtUser">Comentando como <em>${user.displayName}</em>:</div>
                <form method="post" id="formComment" name="formComment">
                    <textarea name="txtContent" id="txtContent">Comentário fake para testes</textarea>
                    <button type="submit">Enviar</button>
                </form>
            `

            // Exibe o formulário na view.
            $('#commentForm').html(cmtForm)

            // Monitora o envio do formulário.
            $('#formComment').submit((event) => {

                // Executa a função quando o evento ocorrer.
                sendComment(event, artData, user)
            })

            // Se não tem usuário logado...
        } else {

            // Monta a view e exibe o convite para logar e comentar.
            cmtForm = `<p class="center"><a href="login">Logue-se</a> para comentar.</p>`
            $('#commentForm').html(cmtForm)
        }
    })

}

/**
 * Salva o comentário enviado na API.
 * O parâmetro 'event' contém o evento que chamou a função.
 * O parâmetro 'artData' contém o artigo completo na forma de objeto.
 * O parâmetro 'userData' contém o usuário completo na forma de objeto.
 * Essa função exibe os resultados diretamente na 'view' e não tem retorno 
 * false caso o comentário fique vazio.
 **/
function sendComment(event, artData, userData) {

    // Bloqueia o envio 'normal' do formulário.
    event.preventDefault()

    // Sanitiza o conteúdo do comentário, removendo tags HTML.
    var content = stripHtml($('#txtContent').val().trim())

    // Atualiza campo de comentário com o comentário sanitizado.
    $('#txtContent').val(content)

    // Se o comentário ficou vazio, retorna sem fazer nada.
    if (content == '') return false

    // Verifica na APi se já existe um comentário com os filtros...
    $.get(app.apiBaseURL + 'comments', {
        uid: userData.uid,    // ... com o mesmo 'id' de usuário
        content: content,     // ... com o mesmo conteúdo
        article: artData.id   // ... para o mesmo artigo
    })

        // Quando a API responder...
        .done((data) => {

            // Se o comentário já exite...
            if (data.length > 0) {

                // Exibe mensagem de erro no popUp.
                popUp({ type: 'error', text: 'Ooops! Este comentário já foi enviado antes...' })

                // Retorna sem fazer nada.
                return false

                // Se o comentário não existe...
            } else {

                // Formata objeto de saída para a API.
                const formData = {
                    name: userData.displayName,
                    photo: userData.photoURL,
                    email: userData.email,
                    uid: userData.uid,
                    article: artData.id,
                    content: content,
                    date: todayToSys(),
                    status: 'on'
                }

                // Envia comentário para a API.
                $.post(app.apiBaseURL + 'comments', formData)

                    // Quando a API responder...
                    .done((data) => {

                        // Se incluiu o comentário...
                        if (data.id > 0) {

                            // Exibe mensagem de sucesso no popUp.
                            popUp({ type: 'success', text: 'Seu comentário foi enviado com sucesso!' })

                            // Recarrega a página para que o novo comentário apareça.
                            loadpage('view')
                        }
                    })

                    // Se a API não responder...
                    .fail((error) => {

                        // Exibe uma mensagem de erro no console
                        console.error(error)

                        // loadpage('e404')
                    })

            }
        })

}

/**
 * Atualiza contagem de visualizações do artigo.
 * O parâmetro 'artData' contém o artigo completo na forma de objeto.
 * Essa função não exibe resultados e não tem retorno.
 */
function updateViews(artData) {

    // Executa um request do tipo 'PATCH' na API.
    $.ajax({
        type: 'PATCH',
        url: app.apiBaseURL + 'articles/' + artData.id,
        data: { views: parseInt(artData.views) + 1 }
    });
}