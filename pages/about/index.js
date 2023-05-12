$(document).ready(myAbout)

function myAbout() {
    changeTitle(`Sobre o ${app.siteName}`)
    delete sessionStorage.userId
    $('#siteName').html(app.siteName)
    getUsersTeam()
}
