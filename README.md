# FrontEndeiros
Aplicativo front-end usando HTML, CSS e JavaScript do grupo 2023.1 de Java.

## Preparando o Aplicativo
À partir de agora, nosso aplicativo depende de um back-end, de uma API que ainda não temos, que será "simulada" pelo "json-server". Além disso, estamos usando o "live-server" que tem o recurso de "live-reload" que reinicia o servidor sempre que fazemos mudanças nos códigos do aplicativo. Isso é interessante, mas, quando nosso código se torna mais dinâmico, justamente por conta do "json-server", essa característica vai atrapalhar nosso desenvolvimento.

Vamos então, fazer alguns ajustes no aplicativo para intergrar a API "fake" e também um novo servidor Web.

### SSL Self Signed
Quando você comandar "npm install ..." e o prompt simplesmente travar, cancele o comando teclando [Ctrl]+[C] e comande:

```npm set strict-ssl false```

Isso desabilita o protocolo HTTPS para download de pacotes do "Node.js".

### json-server
Instalamos o "json-server" dentro da pasta "/api" do aplicativo, então, sempre que baixar uma nova versão deste app, será necessário reinstalar o "json-server". Acesse a pasta "/api" pelo "Node.js command prompt" e comande:

```npm install```

Para rodar a API, comande neste mesmo "Node.js command prompt", dentro da pasta "/api":

```node index.js```

### http-server
Também instalamos o "http-server" para substituir a extensão "live server" do VSCode. Para instalar este pacote, comande:

```npm install -g http-server```

Para rodá-lo, acesse a pasta do nosso aplicativo em um novo "Node.js command prompt" e comande:

```http-server```

### IMPORTANTE!
Observe que, à partir de agora, precisamos de 2 "Node.js command prompt" abertos ao mesmo tempo. No primeiro teremos nossa "API Fake" rodando o json-server e na outra, a instância do servidor Web.
