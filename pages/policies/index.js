$(document).ready(myPolicies)

function myPolicies() {
    changeTitle('Políticas de Privacidade')
    $('.siteName').html(app.siteName)
    $('.siteDomain').html(location.hostname)
}