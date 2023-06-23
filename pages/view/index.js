/**
 * FrontEndeiros 1.0
 * /pages/view/index.js - Controller de view
 * By Luferat
 * MIT License 2023 
 **/

$(document).ready(myView)

function myView() {

    const articleId = parseInt(sessionStorage.article)

    if (isNaN(articleId)) loadpage('e404')

    $.get(app.apiBaseURL + 'articles/' + articleId)
        .done((artData) => {
            if (!artData.id) loadpage('e404')
            $('#artTitle').html(artData.title)
            $('#artContent').html(artData.content)
            updateViews(artData)
            changeTitle(artData.title)
            getAuthor(artData)
            getAuthorArticles(artData, 5)
            getUserCommentForm(artData)
            getArticleComments(artData)

        })
        .fail((error) => {
            popUp({ type: 'error', text: 'Artigo não encontrado!' })
            loadpage('e404')
        })

}

function getAuthor(artData) {
    $.get(app.apiBaseURL + 'users/' + artData.author)
        .done((userData) => {
            $('#artMetadata').html(`<span>Por ${userData.name}</span><span>em ${myDate.sysToBr(artData.date)}.</span>`)
            $('#artAuthor').html(`
                <img src="${userData.photo}" alt="${userData.name}">
                <h3>${userData.name}</h3>
                <h5>${getAge(userData.birth)} anos</h5>
                <p>${userData.bio}</p>
            `)
            getSocialList(userData)
        })
}

function getAuthorArticles(artData, limit) {
    $.get(app.apiBaseURL + `articles/author?uid=${artData.author}&art=${artData.id}&lim=${limit}`)
        .done((artsData) => {
            if (artsData.length > 0) {
                var output = '<h3><i class="fa-solid fa-plus fa-fw"></i> Artigos</h3><ul>'
                artsData.forEach((artItem) => {
                    output += `<li class="article" data-id="${artItem.id}">${artItem.title}</li>`
                });
                output += '</ul>'
                $('#authorArtcicles').html(output)
            }
        })
}

function getArticleComments(artData) {
    $.get(app.apiBaseURL + `comments/${artData.id}`)
        .done((cmtData) => {
            var commentList = ''
            if (cmtData.length > 0) {
                cmtData.forEach((cmt) => {
                    var content = cmt.comment.split("\n").join("<br>")
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
    var content = stripHTML($('#txtContent').val().trim())
    $('#txtContent').val(content)
    if (content == '') return false
    const today = new Date()
    sysdate = today.toISOString().replace('T', ' ').split('.')[0]
    request = app.apiBaseURL + `comments/find?uid=${userData.uid}&art=${artData.id}&txt=${content}`;

    $.get(request)
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
                    comment: content,
                    date: sysdate,
                    status: 'on'
                }
                $.ajax({
                    type: "POST",
                    url: app.apiBaseURL + 'comments',
                    data: JSON.stringify(formData),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data.id > 0) {
                            popUp({ type: 'success', text: 'Seu comentário foi enviado com sucesso!' })
                            loadpage('view')
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        popUp({ type: 'error', text: 'Ocorreram falhas ao enviar. Tente mais tarde.' })
                        loadpage('view')
                    }
                });
            }
        })
}

function updateViews(artData) {
    $.ajax({
        type: 'PATCH',
        url: app.apiBaseURL + 'articles/' + artData.id
    });
}