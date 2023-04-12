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

    ev.preventDefault()

    console.log()

    var formJSON = {}
    const formData = new FormData(ev.target);

    formData.forEach((value, key) => {
        formJSON[key] = value
    })

    $.post('http://localhost:3000/contacts', formJSON)
        .done((data) => {
            console.log(data)
        })

}