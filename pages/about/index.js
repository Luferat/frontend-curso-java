$(document).ready(myAbout)

function myAbout() {
    changeTitle(`Sobre o ${app.siteName}`)
    $('#siteName').html(app.siteName)
    getUsersTeam()
}
