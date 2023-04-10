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
 * Algumas configurações do aplicativo.
 * Dica: você pode acrescentar novas configurações aqui se precisar.
 **/
var app = {
    siteName: 'Futikeiros',
    siteSlogan: 'Programando para o futuro'
}

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

    /**
     * jQuery → Monitora cliques em elementos '<a>' que , se ocorre, chama a função 
     * routerLink().
     **/
    $(document).on('click', 'a', routerLink)

}

/**
 * Função que processa o clique em um link.
 **/
function routerLink() {

    /**
     * Extrai o valor do atributo "href" do elemento clicado e armazena na 
     * variável "href".
     * 
     * OBS: $(this) faz referência especificamente ao elemento que foi clicado.
     * 
     * Referências:
     *  • https://api.jquery.com/attr/
     *  • https://www.w3schools.com/jquery/jquery_syntax.asp
     **/
    var href = $(this).attr('href').trim().toLowerCase()
 
    /**
     * Se clicou em um link externo (http://... OU https://...) ou em uma 
     * âncora (#...),devolve o controle da página para o navegador (return true) 
     * que fará o processamento normal.
     * 
     * OBS: Os carateres '||' (pipe pipe) significam a lógica 'OR' (OU) onde, se 
     * apenas uma das expressões for verdadeira, todas as expressões serão 
     * verdadeiras. Consulte as referências.
     * 
     * Referências:
     *  • https://www.w3schools.com/js/js_if_else.asp
     *  • https://www.w3schools.com/jsref/jsref_substr.asp
     *  • https://www.w3schools.com/js/js_comparisons.asp
     **/
    if (
        href.substring(0, 7) == 'http://' ||
        href.substring(0, 8) == 'https://' ||
        href.substring(0, 1) == '#'
    )
        // Devolve o controle para o HTML.
        return true

    /**
     * Carrega a rota solicitada.
     **/
    loadpage(href)

    /**
     * Encerra o processamento do link sem fazer mais nada. 'return false' 
     * bloqueia a ação normal do navegador sobre um link.
     **/
    return false
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
        html: `pages/${page}/index.html`,
        css: `pages/${page}/index.css`,
        js: `pages/${page}/index.js`
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
             * jQuery → Carrega o CSS da página solicitada na "index.html"
             * principal.
             **/
            $('#pageCSS').attr('href', path.css)

            /**
             * jQuery → Obtém os dados da requisição, no caso, o conteúdo do 
             * componente HTML da página e o exibe no elemento SPA → <main>.
             **/
            $('main').html(data)

            /**
             * jQuery → Obtém o código JavaScript da página, carrega na memória
             * e "executa".
             **/
            $.getScript(path.js)

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

    /**
    * Rola a tela para o início, útil para links no final da página.
    * Referências:
    *  • https://www.w3schools.com/jsref/met_win_scrollto.asp
    **/
    window.scrollTo(0, 0);

    /**
     * Atualiza URL da página com o endereço da rota:
     * Referências:
     *  • https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
     **/
    window.history.pushState({}, '', page);

}

/**
 * Muda o título da página → <title></title>
 * 
 * Instruções:
 * Em cada arquivo "index.js" de cada página, inclua uma chamada para esta 
 * função, passando como parâmetro o título que deve aparecer.
 * 
 * Quando o parâmetro estiver vazio (DEFAULT) o título será:
 *  • app.sitename - app.siteslogan
 * Quando o parâmetro for informado, o título será:
 *  • app.sitename - parâmetro
 * 
 **/
function changeTitle(title = '') {

    /**
     * Define o título padrão da página.
     */
    let pageTitle = app.siteName + ' - '

    /**
     * Se não foi definido um título para a página, 
     * usa o slogan.
     **/
    if (title == '') pageTitle += app.siteSlogan

    /**
     * Se foi definido um título, usa-o.
     */
    else pageTitle += title

    /**
     * Escreve o novo título na tag <title></title>.
     */
    $('title').html(pageTitle)

}