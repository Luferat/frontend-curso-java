/**
 * JSON-Server Fake API
 * By Luferat
 * MIT License
 * 
 * ATENÇÃO! Lembre-se que este aplicativo será substituído pela nossa própria
 * API REST no momento oportuno.
 **/

// Carrega e inicializa o json-server e suas dependências.
const jsonServer = require('json-server')

// Cria um novo aplicativo (objeto) json-server.
const server = jsonServer.create()

// Define o arquivo "JSON" (banco de dados fake).
const router = jsonServer.router('db.json')

// Carrega o recurso de "middlewares" do json-server.
const middlewares = jsonServer.defaults()

// Ativa o recurso de "middlewares" do json-server.
server.use(middlewares)

// Define a porta HTTP do json-server.
const port = 3000

/**
 * Extrai os dados da requisição para tratamento da API.
 * Isso é necessário para os métodos POST e PUT porque eles enviam dados para 
 * a API na forma de JSON que são convertidos (parse) para Object.
 **/
server.use(jsonServer.bodyParser)

/**
 * Intercepta e altera os dados vindos do front-end antes de enviá-los para a 
 * API json-server.
 */
server.use((req, res, next) => {

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

  // Encerra 'server.use()', gravando as alterações.
  next()
})

// Executa a API do json-server.
server.use(router)

// Escutando requisições.
server.listen(port, () => {
  console.log(`JSON Server: http://localhost:${port}/`)
})