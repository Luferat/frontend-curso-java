/**
 * FrontEndeiros 1.0
 * /pages/aboutus/index.js - Controller  de aboutus
 * By Luferat
 * MIT License 2023 
 **/

$(document).ready(myAbout)

function myAbout() {

    changeTitle('Quem somos')
    getUsersTeam()

    if (sessionStorage.userId) {
        var userId = parseInt(sessionStorage.userId)
        // delete sessionStorage.userId


        $.get(app.apiBaseURL + `users/${userId}`)
            .done((data) => {
                var userData = data
                $('#userProfile').html(`
                    <img src="${userData.photo}" alt="${userData.name}">
                    <h3>${userData.name}</h3>
                    <h5>${getAge(userData.birth)} anos</h5>
                    <p>${userData.bio}</p>
                    <div id="socialList"></div>
                    <div id="authorArticles"></div>
                `)
                getSocialList(userData)
                getAuthorArticles(userData)

            })
    }

}

function getAuthorArticles(userData, limit) {
    $.get(app.apiBaseURL + `articles/author?uid=${userData.id}&art=0&lim=999`)
        .done((data) => {
            if (data.length > 0) {
                var htmlOut = `<h3>Artigos de ${userData.name}</h3><ul class="author-art-list">`
                data.forEach((item) => {
                    htmlOut += `<li class="article author-article" data-id="${item.id}">${item.title}</li>`
                })
                htmlOut += '</ul>'
            }
            $('#authorArticles').html(htmlOut)
        })
}
