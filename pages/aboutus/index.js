$(document).ready(myAbout)

function myAbout() {

    changeTitle('Quem somos')
    getUsersTeam()

    if (sessionStorage.userId) {
        var userId = parseInt(sessionStorage.userId)
        // delete sessionStorage.userId

        $.get(app.apiBaseURL + 'users', {
            id: userId,
            status: 'on'
        })
            .done((data) => {
                var userData = data[0]

                var socialList = ''
                if (Object.keys(userData.social).length > 0) {
                    socialList = '<ul class="social-list">'
                    for (const social in userData.social) {
                        socialList += `<li><a href="${userData.social[social]}" target="_blank"><i class="fa-brands fa-fw fa-${social.toLowerCase()}"></i> ${social}</a></li>`
                    }
                    socialList += '</ul>'
                }

                $('#userProfile').html(`
                    <img src="${userData.photo}" alt="${userData.name}">
                    <h3>${userData.name}</h3>
                    <h5>${getAge(userData.birth)} anos</h5>
                    <p>${userData.bio}</p>
                    ${socialList}
                    <div id="authorArticles"></div>
                `)

                getAuthorArticles(userData)

            })
            .fail((error) => {
                console.error(error)
            })
    }

}

function getAuthorArticles(userData, limit) {

    $.get(app.apiBaseURL + 'articles', {
        author: userData.id,
        status: 'on',
        _sort: 'date',
        _order: 'desc',
        _limit: limit || 999
    })
        .done((data) => {

            if(data.length > 0){
                var htmlOut = `<h3>Artigos do ${userData.name}</h3><ul class="author-art-list">`

                data.forEach((item) => {
                    htmlOut += `<li class="article author-article" data-id="${item.id}">${item.title}</li>`
                })

                htmlOut += '</ul>'
            }


            $('#authorArticles').html(htmlOut)

        })
        .fail((error) => {
            console.error(error)
        })
}
