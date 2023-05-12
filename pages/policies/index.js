/**
 * FrontEndeiros 1.0
 * /pages/policies/index.js - Controller de policies
 * By Luferat
 * MIT License 2023 
 **/

$(document).ready(myPolicies)

function myPolicies() {
    changeTitle('Políticas de Privacidade')
    $('.siteName').html(app.siteName)
    $('.siteDomain').html(location.hostname)
}