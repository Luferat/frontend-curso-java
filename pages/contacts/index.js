/**
 * Contacts Control
 * By Luferat
 * MIT License 
 **/

// Executa 'myContacts()' quando o documento estiver pronto.
$(document).ready(myContacts)

/**
 * Função principal da página "contacts".
 **/
function myContacts() {

    /**
     * Altera o título da página quando 'contacts' for acessada.
     * Usa a função sendContact() definida em '/index.js'.
     **/
    changeTitle('Faça contato')

    // Monitora status de autenticação do usuário
    firebase.auth().onAuthStateChanged((user) => {

        // Se o usuário está logado...
        if (user) {

            // Preenche campos do formulário.
            $('#name').val(user.displayName)
            $('#email').val(user.email)

            // Foca no assunto.
            $('#subject').focus()

        } else {

            // Foca no nome.
            $('#name').focus()
        }
    });

    /**
     * Promise do formulário de contatos.
     * Quando o formulário for enviado (onsubmit), executa a função
     * sendContact().
     */
    $('#cForm').submit(sendContact)

    // Anima ícones de redes sociais.
    $('.contacts a').mouseover(animeIcon)
    $('.contacts a').mouseout(noAnimeIcon)

}

function animeIcon() {
    $(this).children('i').addClass('fa-beat-fade')
}

function noAnimeIcon() {
    $(this).children('i').removeClass('fa-beat-fade')
}

/**
 * Processa o envio do formulário de contatos.
 */
function sendContact(ev) {

    // Bloqueia a ação normal do HTML, de enviar o formulário.
    ev.preventDefault()

    // Cria o objeto que vai armazenar dados de saída para a API.
    var formJSON = {}

    // Armazena o formulário como um objeto.
    const formData = new FormData(ev.target);

    // Obtém cada campo do formulário.
    formData.forEach((value, key) => {

        // Sanitiza o valor do campo e armazena no atributo do JSON.
        formJSON[key] = value.trim()

        // Atualiza o campo sanitizado, no formulário.
        $('#' + key).val(formJSON[key])

    })

    // Verifica se tem algum campo vazio.
    for (const key in formJSON) {

        // Se algum campo está vazio...
        if (formJSON[key] == '')

            // Sai de sendContact() sem fazer nada.
            return false
    }

    // Obtém a data atual do sistema em 'system date' (aaaa-mm-dd hh:ii:ss).
    formJSON.date = myDate.todayToSys()

    // Campo de status do contato.
    formJSON.status = 'received'

    // Envia os dados do formulário para a API.
    $.post(app.apiBaseURL + 'contacts', formJSON)

        // Ao concluir o envio, armazena o retorno da API em "data".
        .done((data) => {

            // Variável para armazenar a mensagem de retorno para o usuário.
            var feedback;

            // Se a API respondeu com sucesso...
            if (data.id > 0) {

                // Extrai o primeiro nome do usuário.
                var firstName = formJSON.name.split(' ')[0]

                // Gera a mensagem de agradecimento.
                feedback = `
                    <h3>Olá ${firstName}!</h3>
                    <p>Seu contato foi enviado com sucesso.</p>
                    <p>Obrigado...</p>
                `;

                // Se a API respondeu com erro...
            } else {

                // Gera a mensagem de agradecimento.
                feedback = `
                    <h3>Oooops!</h3>
                    <p>Não foi possível enviar seu contato. Ocorreu uma falha no servidor.</p>
                    <p><em><code>${data.data.message}</code></em></p>
                `
            }

            // Limpa campos do formulário.
            for (const key in formJSON)
                $('#' + key).val('')

            // Substitui conteúdo do formulário pela mensagem de retorno.
            $('#cForm').html(feedback)
        })

    // Sai da função sendContact() sem fazer mais nada.
    return false
}