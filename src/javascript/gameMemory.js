class GameMemory{
    
    constructor({ screenGame, util }){
        this.screenGame = screenGame
        this.util = util

        this.heroes = [
            {img: './images/ironMan.jpg' , name:'iron man'},
            {img: './images/blackWidow.jpg' , name:'black widow'},
            {img: './images/thor.jpg' , name:'thor'},
            {img: './images/captainAmerica.jpg' , name:'captain america'},
            {img: './images/captainMarvel.jpg' , name:'captainMarvel'},
            {img: './images/hawkeye.jpg' , name:'hawkeye'},
            {img: './images/hulk.jpg' , name:'hulk'},
            {img: './images/machineCombat.jpg' , name:'machine combat'},
            {img: './images/nebula.jpg' , name:'nebula'},
            {img: './images/okoye.jpg' , name:'okoye'},
            {img: './images/rocket.jpg' , name:'rocket'},
            {img: './images/avengers.jpg' , name:'avengers'},
            
        ]
        this.iconPadrao = './images/padrao.jpg'
        this.heroesHidden = []
        this.heroesSelections = []
    }
    inicializar(){
        this.screenGame.atualizarImagens(this.heroes)
        // iniciar o jogo
        this.screenGame.botaoJogar(this.jogar.bind(this))

        this.screenGame.botaoVerificarSelecao(this.verificarSelecao.bind(this))

        this.screenGame.botaoMostrarTudo(this.exibirTodosHerois.bind(this))
    }
    async embaralhar(){

        // criar cópias dos elementos do array dos hérois
        const copyHeroes = this.heroes
        .concat(this.heroes)
        // adicionar um id aleatorio a cada item para realizar o embaralhamento
        .map(item => {
            return Object.assign({}, item, {id:Math.random()/ 0.5})
        })
        // embaralhar de modo aleatorio os itens na tela 
        .sort(() => Math.random() - 0.8)

        // atualizar tela do jogo com as cópias
        this.screenGame.atualizarImagens(copyHeroes)
        this.screenGame.exibirCarregando()

        const idDoIntervalo = this.screenGame.iniciarTimer()

        // 3 segundo para atualizar a tela
        await this.util.timeout(3000)
        this.screenGame.limparContadorTimer(idDoIntervalo)
        this.esconderHerois(copyHeroes)
        this.screenGame.exibirCarregando(false)
        
    }
    esconderHerois(heroes){

        // ocultar os herois com a imagem padrao
        const heroesOccult = heroes.map(({name, id}) => ({
            id,
            name,
            img:this.iconPadrao
        }) )
        // atualizar tela com herois ocultos
        this.screenGame.atualizarImagens(heroesOccult)
        // guardar os herois para logo podermos usa-los em seguida
         this.heroisOcultos = heroesOccult
    }

    exibirHerois(nameOfHero){

        const { img } = this.heroes.find(({name}) => nameOfHero === name)
        this.screenGame.exibirHerois(nameOfHero, img)
    }
    verificarSelecao(id, name){
        const item = { id , name}
        const heroesSelections = this.heroesSelections.length

        switch(heroesSelections){
            case 0: 
                this.heroesSelections.push(item)
                break;
            case 1 :
                const [opcao1] = this.heroesSelections

                this.heroesSelections =[]

                if(opcao1.name === item.name && opcao1.id !== item.id){
                    this.exibirHerois(item.name)
                    this.screenGame.exibirMensagem()
                    return;
                }
                this.screenGame.exibirMensagem(false)

                break;
        }

    }
    exibirTodosHerois(){
        const heroisOcultos = this.heroisOcultos
        for(const heroi of heroisOcultos){
            const { img } = this.heroes.find(item => item.name === heroi.name)
            heroi.img = img
        }
        this.screenGame.atualizarImagens(heroisOcultos)
    }

    jogar(){
        this.embaralhar()
    }
    

}