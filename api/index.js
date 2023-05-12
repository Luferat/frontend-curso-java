/**
 * FrontEndeiros API 1.0
 * /index.js - Aplicativo principal
 * By Luferat
 * MIT License 2023 
 **/

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares)
server.use(router)
server.listen(80, () => { console.log('JSON Server is running') })
