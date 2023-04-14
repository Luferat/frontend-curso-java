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

    /**
     * Promise do formulário de contatos.
     * Quando o formulário for enviado (onsubmit), executa a função
     * sendContact().
     */
    $('#cForm').submit(sendContact)

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

    // Envia os dados do formulário para a API.
    $.post(app.apiContactsURL, formJSON)
        .done((data) => {
            var feedback;
            if (data.status == 'success') {
                var firstName = formJSON.name.split(' ')[0]
                feedback = `
                    <h3>Olá ${firstName}!</h3>
                    <p>Seu contato foi enviado com sucesso.</p>
                    <p>Obrigado...</p>
                `
            } else {
                feedback = `
                    <h3>Oooops!</h3>
                    <p>Não foi possível enviar seu contato. Ocorreu uma falha no servidor.</p>
                    <p><em><code>${data.data.message}</code></em></p>
                `
            }

            // Limpar campos do formulário.
            for (const key in formJSON)
                $('#' + key).val('')

            // Mostra feedback.
            $('#cForm').html(feedback)
        })

    // Sai da função sendContact() sem fazer mais nada.
    return false
}