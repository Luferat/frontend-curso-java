/**
 * FrontEndeiros 1.0
 * MIT License 2023 By Luferat
 **/

/**
 * 
 * JavaScript do aplicativo.
 * Depende de "jQuery" (https://jquery.com/).
 *
 * OBS 1: Este é o aplicativo principal, para que o tema (template) do site
 * opere. Posteriormente, quando necessário, cada página (conteúdo) terá seu
 * próprio JavaScript, assim, somente o JavaScript necessário será carregado.
 *
 * OBS 2: Todas as instruções que iniciam com um cifrão ($) são da biblioteca
 * jQuery, ou seja, não são JavaScript "puro" (ou vanilla 😉).
 *
 * Para saber mais:
 *  • https://www.w3schools.com/js/
 *  • https://www.w3schools.com/jsref/
 *  • https://www.w3schools.com/jquery/
 **/

/**
 * jQuery → Quando o documento estiver pronto, executa a função principal,
 * 'runApp()'.
 * 
 * Referências:
 *  • https://www.w3schools.com/jquery/jquery_syntax.asp
 **/
$(document).ready(myApp)

/**
 * Este é o aplicativo principal, executado logo após a carga dos documentos
 * estátivos (HTML e CSS) no navegador.
 * Aqui incluimos  as chamadas de todas as funções de inicialização e o 
 * monitoramento dos eventos do aplicativo.
 *
 * NOTA! 
 * Um aplicativo é uma função, um bloco de código que fica armazenado na 
 * memória do dispositivo e será executado quando for "chamado" (invocado)
 * pelo nome.
 * 
 * Referências:
 *  • https://www.w3schools.com/js/js_functions.asp
 **/
function myApp() {

    /**
     * Faz a carga da página inicial do SPA. A página a ser carregada na 
     * inicialização é definida pela string parâmetro e corresponde a uma
     * das subpastas de "/pages".
     * 
     * Posteriormente, esta chamada à "loadpage()" será otimizada para melhorar
     * o paradigma "SEO Friendly" do aplicativo.
     **/
    loadpage('home')

}

/**
 * Carrega uma página no SPA.
 * O caminho da página é passado como string parâmetro da função e corresponde
 * a uma das subpastas de "/pages".
 * 
 * Para criar uma nova página no aplicativo:
 *  1. Acesse a pasta "/pages";
 *  2. Crie uma subpasta com o nome canônico (rota) desta nova página;
 *     O nome da pasta deve ser curto e usar somente letras e números, nunca
 *     iniciando com um número e, preferencialmente usando somente letras 
 *     minúsculas. Por exemplo: /pages/mypage
 *  3. Crie os 3 componentes da página na subpasta e seu conteúdo:
 *     • index.html → (Model) documento HTML com o "corpo" da página a ser 
 *                    carregada no SPA;
 *     • index.css → (View) documento CSS que estiliza a página.
 *     • index.js → (Control) JavaScript de controle da página.
 *  4. Crie os links para a nova página, apontando-os para a rota desta, por 
 *     exemplo: <a href="mypage">Minha página</a>
 *  5. Já para carregar esta página no SPA pelo JavaScript, comandamos 
 *     "loadpage('mypage')", por exemplo.
 **/
function loadpage(page) {

    /*
     * Monta os caminhos (path) para os componentes da página solicitada, 
     * à partir do valor da variável "page".
     * Lembre-se que cada página é formada por 3 componentes:
     *  • index.html → (Model) documento HTML com o "corpo" da página a ser
     *                    carregada no SPA;
     *  • index.css → (View) documento CSS que estiliza a página.
     *  • index.js → (Control) JavaScript de controle da página.
     * 
     * IMPORTANTE!
     * Mesmo que não seja necessário um CSS ou JavaScript para a página, os 
     * arquivos "index.css" e "index.js" devem existir na pasta desta página
     * para evitar "erro 404". Neste caso, insira alguns comentários nos 
     * documentos.
     * 
     * Referências:
     *  • https://www.w3schools.com/js/js_objects.asp   
     *  • https://www.w3schools.com/js/js_string_templates.asp
     */
    const path = {
        html: `/pages/${page}/index.html`,
        css: `/pages/${page}/index.css`,
        js: `/pages/${page}/index.js`
    }

    /**
     * jQuery → Faz a requisição (request) do componente HTML da página, a ser 
     * inserido no SPA.
     * 
     * OBS: carregamos o HTML na memória primeiro, para ter certeza que ele 
     * existe e não vai dar erro 404.
     * 
     * Referências:
     *  • https://www.w3schools.com/jquery/ajax_get.asp
     **/
    $.get(path.html)

        /**
         * Quando ocorrer um "response", os dados obtidos serão carregados na 
         * memória do aplicativo e estarão disponíveis para uso deste.
         * Neste caso, criamos uma função "sem nome" ()=>{} que obtém os dados
         * e armazena em "data" para uso posterior.
         * 
         * Referências:
         *  • https://www.w3schools.com/js/js_arrow_function.asp
         **/
        .done((data) => {

            /**
             * Obtém os dados da requisição, no caso, o conteúdo do componente 
             * HTML da página e o exibe no elemento SPA (tag <main>).
             **/
            $('main').html(data)
        })

        /**
         * Caso o "request" falhe, por conta de o documento solicitado não 
         * existir, carrega a página de erro "e404" ('/pages/e404') no SPA.
         **/
        .fail((error) => {

            /**
             * Carrega a página de erro 404 no SPA.
             */
            loadpage('e404')

            /**
             * Exibe a mensagem de erro que ocorreu no console, para depuração.
             * Opcionalmente, esta linha poderá/deverá ser removida no momento
             * do deploy (publicação) da versão final.
             */
            console.error(error)
        })

}