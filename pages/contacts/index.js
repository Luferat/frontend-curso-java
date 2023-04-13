$(document).ready(myContacts)

/**
 * Função principal da página "contacts".
 **/
function myContacts() {
    /**
     * Altera o título da página quando 'contacts' for acessada.
     **/
    changeTitle('Faça contato')

    $(document).on('submit', '#cForm', sendContact)

}

function sendContact(ev) {

    var formJSON = {}

    const formData = new FormData(ev.target);

    formData.forEach((value, key) => {
        formJSON[key] = value
    })

    $.post('http://localhost:3000/contacts', formJSON)
    .done((data) => {
        if(data.status == 'success') {
            var firstName = formJSON.name.split(' ')[0]
            var feedback = `
                <h3>Olá ${firstName}!</h3>
                <p>Seu contato foi enviado com sucesso.</p>
                <p>Obrigado...</p>
            `
            $('#cForm').html(feedback)
        }
    })

    return false
}