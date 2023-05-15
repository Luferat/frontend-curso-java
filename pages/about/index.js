/**
 * FrontEndeiros 1.0
 * /pages/about/index.js - Controller de about
 * By Luferat
 * MIT License 2023 
 **/

$(document).ready(myAbout)

function myAbout() {
    changeTitle(`Sobre o ${app.siteName}`)
    delete sessionStorage.userId
    $('#siteName').html(app.siteName)
    getUsersTeam()
}
