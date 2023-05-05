$(document).ready(myView)

function myView() {

    const articleId = parseInt(sessionStorage.article)

    if (isNaN(articleId)) loadpage('e404')

    $.get(apiBaseURL + 'articles', { id: articleId, status: 'on' })
        .done((data) => {
            if (data.length != 1) loadpage('e404')
            artData = data[0]
            $('#artTitle').html(artData.title)
            $('#artContent').html(artData.content)
            getAuthorDate(artData)
            getAuthorArticles(artData, 5)
            getUserCommentForm(artData)
            getArticleComments(artData, 999)
        })
        .fail((error) => {
            console.error(error)
            loadpage('e404')
        })

}

function getAuthorDate(artData) {
    $.get(apiBaseURL + 'users/' + artData.author)
        .done((userData) => {
            $('#artMetadata').html(`<span>Por ${userData.name}</span><span>em ${sysToBrDate(artData.date)}.</span>`)
            $('#artAuthor').html(`
            <img src="${userData.photo}" alt="${userData.name}">
            <h3>${userData.name}</h3>
            <h5>${getAge(userData.birth)} anos</h5>
            <p>${userData.bio}</p>
        `)
        })
        .fail((error) => {
            console.error(error)
            loadpage('e404')
        })
}

function sysToBrDate(systemDate) {
    var parts = systemDate.split(' ')[0].split('-')
    return `${parts[2]}/${parts[1]}/${parts[0]} às ${systemDate.split(' ')[1]}`
}


function getAuthorArticles(artData, limit) {

    $.get(apiBaseURL + 'articles', {
        author: artData.author,
        status: 'on',
        id_ne: artData.id,
        _limit: limit
    })
        .done((artsData) => {
            if (artsData.length > 0) {
                var output = '<h3><i class="fa-solid fa-plus fa-fw"></i> Artigos</h3><ul>'
                var rndData = artsData.sort(() => Math.random() - 0.5)
                rndData.forEach((artItem) => {
                    output += `<li class="art-item" data-id="${artItem.id}">${artItem.title}</li>`
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

    $.get(apiBaseURL + 'comments', {
        article: artData.id,
        status: 'on',
        _sort: 'date',
        _order: 'desc',
        _limit: limit
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
                                    <span>Por ${cmt.name}</span><span>em ${sysToBrDate(cmt.date)}.</span>
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
                    <textarea name="txtContent" id="txtContent">Comentário fake para testes</textarea>
                    <button type="submit">Enviar</button>
                </form>
            `
        } else {
            cmtForm = `<p class="center"><a href="login">Logue-se</a> para comentar.</p>`
        }
        $('#commentForm').html(cmtForm)
    })

}