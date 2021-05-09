const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIBLE = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const util = Util
const ID_MOSTRAR_TUDO = "mostrarTudo"

const Mensagens ={
    sucesso:{
        texto:"Combinação correta!",
        classe: "alert-success"
    },
    erro:{
        texto:"Combinação incorreta!",
        classe:"alert-danger"
    }
}
class ScreenGame{

    /*
        método que recebe um item com as informações de img e name, retornando um elemento HTML
    */
    static obterCodigoHTML(item){
        return `
            <div class="col-md-1 mx-auto">
                <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}', '${item.name}')">
                    <img src="${item.img}" name="${item.name}" class="card-img-top"alt="...">
                </div>
                <br />
            </div>
        `
    }

    static botaoVerificarSelecao(funcaoOnClick){
       window.verificarSelecao = funcaoOnClick
    }
    /*
        método que recebe um código HTML e inseri o mesmo na tela, na div já selecionada
    */
    static alterarConteudoHTML(codeHTML){
        const conteudo = document.getElementById(ID_CONTEUDO);
        conteudo.innerHTML= codeHTML;
    }
    // todo item da lista, irá ser executado a função de obterCodigoHTML
    //no fim, será concatenado tudo em um única string
    static gerarStringPelaImagem(itens){
        return itens.map(ScreenGame.obterCodigoHTML).join('')
    }
    static atualizarImagens(itens){
        const codigoHTML = ScreenGame.gerarStringPelaImagem(itens)
        ScreenGame.alterarConteudoHTML(codigoHTML)
    }

    static botaoJogar(funcaoOnClick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick =funcaoOnClick
    }

    static exibirHerois (nameOfHero, img){

        const elementosHTML = document.getElementsByName(nameOfHero)
        elementosHTML.forEach(item => (item.src = img))
    }

    static async exibirMensagem(sucesso = true){
        const elemento = document.getElementById(ID_MENSAGEM)

        if(sucesso){
            elemento.classList.remove(Mensagens.erro.classe)
            elemento.classList.add(Mensagens.sucesso.classe)
            elemento.innerText = Mensagens.sucesso.texto
        }
        else{
            elemento.classList.remove(Mensagens.sucesso.classe)
            elemento.classList.add(Mensagens.erro.classe)
            elemento.innerText = Mensagens.erro.texto

        }
        elemento.classList.remove(CLASSE_INVISIBLE)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIBLE)
    }
    static exibirCarregando(mostrar = true){
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carregando.classList.remove(CLASSE_INVISIBLE)
            return;
        }
        carregando.classList.add(CLASSE_INVISIBLE)
    }
    static iniciarTimer(){
        let contador = 3
        const elementoContador = document.getElementById(ID_CONTADOR)

        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`

        const atualizarTexto = ()=>
        (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contador--))

        atualizarTexto()
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
    }

    static limparContadorTimer(idDoIntervalo){
        clearInterval(idDoIntervalo)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static botaoMostrarTudo(funcaoOnClick){
        const btnMostarTudo = document.getElementById(ID_MOSTRAR_TUDO)
        btnMostarTudo.onclick = funcaoOnClick
    }
}