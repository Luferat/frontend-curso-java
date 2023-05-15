# FrontEndeiros
Aplicativo front-end usando HTML, CSS e JavaScript do grupo 2023.1 de Java.  

## Preparando o Aplicativo
À partir de agora, nosso aplicativo depende de um back-end, de uma API que ainda não temos, que será "simulada" pelo "json-server". Além disso, estavamos usando o "live-server" que tem o recurso de "live-reload" que reinicia o servidor sempre que fazemos mudanças nos códigos do aplicativo. Isso é interessante, mas, quando nosso código se torna mais dinâmico, justamente por conta do "json-server", essa característica vai atrapalhar nosso desenvolvimento.  

Vamos então, fazer alguns ajustes no aplicativo para integrar a API "fake" e também um novo servidor Web.

### SSL Self Signed
Quando você comandar `npm install ...` e o prompt simplesmente travar, cancele o comando teclando [Ctrl]+[C] e comande:
```
npm set strict-ssl false
```

Isso desabilita o protocolo HTTPS para download de pacotes do "Node.js" e você pode tentar `npm install ...` novamente.

### Repositório
Clone o repositório do aplicativo, da sua conta "GitHub.com", para o computador local usando o comando `git clone` ou o aplicativo "GitHub Desktop" (recomendado).

Lembre-se da pasta local onde ocorreu a clonagem, pois precisamos dela.

### API Fake
Nossa "API Fake" está disponível na forma de um arquivo JSON dentro da pasta "/api" do aplicativo.  Também é necessário ter o `json-server` instalado na "API". Siga os passos, após clonar o repositório:

1. Abra um "**Node.js command prompt**";
2. Acesse a pasta onde baixou/clonou o aplicativo. Use o comando `cd`;
3. Acesse a pasta `api` pelo "**Node.js command prompt**";
4. Comande:
```
npm install
```

5. Caso ainda não tenha, crie um arquivo chamado `db.json` na pasta `api` acima;
4. Esse arquivo deve ter o seguinte conteúdo inicial:

```
{
    contacts: [],
    users: [],
    articles: [],
    comments: []
}
```

> Recomenda-se baixar este arquivo, já pronto, do repositório de um colega ou do instrutor, pois ele já tem alguns dados cadastrados...

5. Para rodar a API, comande neste mesmo "**Node.js command prompt**", dentro da pasta `api`:
```
node index.js
```

>**Lembre-se!**
> Sempre que fizer alterações no arquivo "db.json", pode ser que a "API Fake" pare de funcionar. Nesse caso, interrompa o `json-server` teclando ``[Ctrl] + [C]`` no "**Node.js command prompt**" onde a API está rodando e reinicie-a com o comando `json-server --watch db.json`.

## API as a Module
Desde a versão ``2023.05.05`` do aplicativo, trocamos o "json-server" que rodava na forma de aplicativo, em uma instalação global, para uma versão modular que é instalada dentro da própria "API". Essa é uma etapa de preparação para fazer experimentos com a "API" publicada na Web.

Com isso, observe que o comando para inicializar a **API Fake** mudou de ``json-server --watch db.json`` para ``node index.js``. A porta HTTP também passa a ser ``80``, porta padrão do HTTP. Isso é configurável diretamente em ``/api/index.js`` se você precisar. Sempre que clonar o repositório em um novo local, será necessário instalar as dependências comandando ``npm install`` dentro da pasta ``/api``.

Por padrão a "API Fake" está rodando no endereço ``http://localhost/``.

### Servidor Web
Como a "API Fake" está operando "dentro" das pastas do aplicativo, se usarmos o `live-server` instalado no "VSCode", teremos problemas. Cada vez que o arquivo `db.json` é atualizado pela API, o aplicativo reinicia, atrapalhando o fluxo de operação. Isso vale só enquanto a "API Fake" está na mesma estrutura do "front-end".

Vamos instalar outro servidor HTTP para "rodar" o front-end, um que não tenha o recurso "live-server". Vamos usar o "http-server" para substituir a extensão "live server" do VSCode. Para instalar este pacote:

1. Abra um novo  "**Node.js command prompt**" porque o primeiro está "rodando" a "API Fake";
2. Acesse a pasta onde baixou/clonou o aplicativo. Use o comando `cd`;
3. Instale o "http-server" globalmente, comandando:
```
npm install -g http-server
```
4. Para rodar o aplicativo, neste no mesmo "**Node.js command prompt**" acima, comande:
```
http-server
```
Por padrão, o aplicativo está rodando no endereço ``http://localhost:8080``, onde ``8080`` é a porta da primeira instância do "http-server".

> **IMPORTANTE!**
> Observe que precisamos de 2 "**Node.js command prompt**" abertos ao mesmo tempo. No primeiro teremos nossa "**API Fake**" rodando o `json-server` e no outro, a instância do servidor Web com nosso `front-end`.

### Front-end
Para testar o aplicativo, abra o navegador e acesse o endereço informado pelo `http-server` quando foi iniciado, normalmente `http://localhost:8080`.
