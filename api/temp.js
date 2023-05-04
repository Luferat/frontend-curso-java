
// Se esta enviando um novo comentário...
if (req.method == 'POST' && req.path == '/comments') {

    // Obtém a data atual do sistema.
    const today = new Date()

    // Formata a data para 'system date' (aaaa-mm-dd hh:ii:ss).
    sysdate = today.toISOString().replace('T', ' ').split('.')[0]

    // Inclui a data no 'body' da requisição.
    req.body.date = sysdate

    // Inclui o status do comentário.
    req.body.status = 'on'

    /**
     * Renderiza a 'view' do json-server.
     * Isso altera a saída padrão do json-server para customizá-la.
     **/
    router.render = (req, res, next) => {

        // Se o novo comentário foi gravado com sucesso...
        if (res.locals.data.id > 0) {

            /** 
             * Responde com o JSON.
             * O importante aqui é { "status" : "success" }, o restante é opcional.
             **/
            res.json({
                status: 'success',
                data: {
                    message: 'Comentário salvo',
                    HTTPcode: res.statusCode,
                    id: res.locals.data.id
                }
            })

            // Se houve falha ao gravar comentário...
        } else {

            /** 
             * Responde com o JSON.
             * O importante aqui é { "status" : "error" }, o restante é opcional.
             **/
            res.json({
                status: 'error',
                data: {
                    message: 'Falha ao gravar comentário'
                }
            })
        }
    }
}










// Se esta enviando um novo contato...
if (req.method == 'POST' && req.path == '/contacts') {

    // Obtém a data atual do sistema.
    const today = new Date()

    // Formata a data para 'system date' (aaaa-mm-dd hh:ii:ss).
    sysdate = today.toISOString().replace('T', ' ').split('.')[0]

    // Inclui a data no 'body' da requisição.
    req.body.date = sysdate

    // Inclui o status do contato.
    req.body.status = 'received'

    /**
     * Renderiza a 'view' do json-server.
     * Isso altera a saída padrão do json-server para customizá-la.
     **/
    router.render = (req, res, next) => {

        // Se o novo contato foi gravado com sucesso...
        if (res.locals.data.id > 0) {

            /** 
             * Responde com o JSON.
             * O importante aqui é { "status" : "success" }, o restante é opcional.
             **/
            res.json({
                status: 'success',
                data: {
                    message: 'Contato salvo',
                    HTTPcode: res.statusCode,
                    id: res.locals.data.id
                }
            })

            // Se houve falha ao gravar contato...
        } else {

            /** 
             * Responde com o JSON.
             * O importante aqui é { "status" : "error" }, o restante é opcional.
             **/
            res.json({
                status: 'error',
                data: {
                    message: 'Falha ao gravar contato'
                }
            })
        }
    }
}