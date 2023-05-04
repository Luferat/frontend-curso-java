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

  console.log('_+_+_+', req.method, req.path)

  if (req.method == 'POST') {

    if (req.path == '/comments') {

      // Obtém a data atual do sistema.
      const today = new Date()

      // Formata a data para 'system date' (aaaa-mm-dd hh:ii:ss).
      sysdate = today.toISOString().replace('T', ' ').split('.')[0]

      // Inclui a data no 'body' da requisição.
      req.body.date = sysdate

      // Inclui o status do comentário.
      req.body.status = 'on'

      router.render = (req, res, next) => {
      }

    } else if (req.path == '/contacts') {

      console.log('gogolo')

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