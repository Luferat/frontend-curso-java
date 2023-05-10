$(document).ready(myAbout)

function myAbout() {
    changeTitle(`Sobre o ${app.siteName}`)
    $('#siteName').html(app.siteName)
    getUsersTeam()
}

function getUsersTeam(limit) {
    var htmlOut = ''
    $.get(app.apiBaseURL + 'users', {
        status: 'on',
        _sort: 'name',
        _order: 'asc'
    })
        .done((data) => {
            data.forEach((item) => {
                var type
                switch (item.type) {
                    case 'admin': type = 'Administrador(a)'; break
                    case 'author': type = 'Autor(a)'; break
                    case 'moderator': type = 'Moderador(a)'; break
                    default: type = 'Colaborador(a)'
                }

                htmlOut += `
                    <div class="users-grid-item" data-id="${item.id}">
                        <img src="${item.photo}" alt="${item.name}">
                        <h4>${item.name.split(' ')[0]}</h4>
                        <small>${item.name}</small>
                        <ul>
                            <li>${getAge(item.birth)} anos</li>
                            <li>${type}
                        </ul>
                    </div>
                `
            })

            $('#usersGrid').html(htmlOut)

        })

}