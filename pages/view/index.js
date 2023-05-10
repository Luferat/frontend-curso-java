$(document).ready(myView)

function myView() {

    const articleId = parseInt(sessionStorage.article)

    if (isNaN(articleId)) loadpage('e404')

    $.get(app.apiBaseURL + 'articles', { id: articleId, status: 'on' })
        .done((data) => {
            if (data.length != 1) loadpage('e404')
            artData = data[0]
            $('#artTitle').html(artData.title)
            $('#artContent').html(artData.content)
            updateViews(artData)
            changeTitle(artData.title)
            getAuthor(artData)
            getAuthorArticles(artData, 5)
            getUserCommentForm(artData)
            getArticleComments(artData, 999)
        })
        .fail((error) => {
            popUp({ type: 'error', text: 'Artigo não encontrado!' })
            loadpage('e404')
        })

}

function getAuthor(artData) {
    $.get(app.apiBaseURL + 'users/' + artData.author)
        .done((userData) => {


            var socialList = ''
            if (Object.keys(userData.social).length > 0) {
                socialList = '<ul class="social-list">'
                for (const social in userData.social) {
                    socialList += `<li><a href="${userData.social[social]}" target="_blank"><i class="fa-brands fa-fw fa-${social.toLowerCase()}"></i> ${social}</a></li>`
                }
                socialList += '</ul>'
            }


            $('#artMetadata').html(`<span>Por ${userData.name}</span><span>em ${myDate.sysToBr(artData.date)}.</span>`)
            $('#artAuthor').html(`
                <img src="${userData.photo}" alt="${userData.name}">
                <h3>${userData.name}</h3>
                <h5>${getAge(userData.birth)} anos</h5>
                <p>${userData.bio}</p>
                ${socialList}
            `)
        })
        .fail((error) => {
            console.error(error)
            loadpage('e404')
        })
}

function getAuthorArticles(artData, limit) {

    $.get(app.apiBaseURL + 'articles', {
        author: artData.author,
        status: 'on',
        id_ne: artData.id,
        _limit: limit || 5
    })
        .done((artsData) => {
            if (artsData.length > 0) {
                var output = '<h3><i class="fa-solid fa-plus fa-fw"></i> Artigos</h3><ul>'
                var rndData = artsData.sort(() => Math.random() - 0.5)
                rndData.forEach((artItem) => {
                    output += `<li class="article" data-id="${artItem.id}">${artItem.title}</li>`
                });
                output += '</ul>'
                $('#authorArtcicles').html(output)
            }
        })
        .fail((error) => {
            console.error(error)
            loadpage('e404')
        })

}

function getArticleComments(artData, limit) {

    var commentList = ''

    $.get(app.apiBaseURL + 'comments', {
        article: artData.id,
        status: 'on',
        _sort: 'date',
        _order: 'desc',
        _limit: limit || 999
    })
        .done((cmtData) => {
            if (cmtData.length > 0) {
                cmtData.forEach((cmt) => {
                    var content = cmt.content.split("\n").join("<br>")
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
            } else {
                commentList = '<p class="center">Nenhum comentário!<br>Seja o primeiro a comentar...</p>'
            }
            $('#commentList').html(commentList)
        })
        .fail((error) => {
            console.error(error)
            loadpage('e404')
        })

}

function getUserCommentForm(artData) {

    var cmtForm = ''

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            cmtForm = `
                <div class="cmtUser">Comentando como <em>${user.displayName}</em>:</div>
                <form method="post" id="formComment" name="formComment">
                    <textarea name="txtContent" id="txtContent"></textarea>
                    <button type="submit">Enviar</button>
                </form>
            `
            $('#commentForm').html(cmtForm)
            $('#formComment').submit((event) => {
                sendComment(event, artData, user)
            })
        } else {
            cmtForm = `<p class="center"><a href="login">Logue-se</a> para comentar.</p>`
            $('#commentForm').html(cmtForm)
        }
    })

}

function sendComment(event, artData, userData) {

    event.preventDefault()
    var content = stripHtml($('#txtContent').val().trim())
    $('#txtContent').val(content)
    if (content == '') return false

    const today = new Date()
    sysdate = today.toISOString().replace('T', ' ').split('.')[0]

    $.get(app.apiBaseURL + 'comments', {
        uid: userData.uid,
        content: content,
        article: artData.id
    })
        .done((data) => {
            if (data.length > 0) {
                popUp({ type: 'error', text: 'Ooops! Este comentário já foi enviado antes...' })
                return false
            } else {

                const formData = {
                    name: userData.displayName,
                    photo: userData.photoURL,
                    email: userData.email,
                    uid: userData.uid,
                    article: artData.id,
                    content: content,
                    date: sysdate,
                    status: 'on'
                }

                $.post(app.apiBaseURL + 'comments', formData)
                    .done((data) => {
                        if (data.id > 0) {
                            popUp({ type: 'success', text: 'Seu comentário foi enviado com sucesso!' })
                            loadpage('view')
                        }
                    })
                    .fail((err) => {
                        console.error(err)
                    })

            }
        })

}

function updateViews(artData) {
    $.ajax({
        type: 'PATCH',
        url: app.apiBaseURL + 'articles/' + artData.id,
        data: { views: parseInt(artData.views) + 1 }
    });
}