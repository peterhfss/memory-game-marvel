function onLoad(){
    //console.log(`Game load`, ScreenGame, GameMemory)
    const dependencias = {
        screenGame : ScreenGame,
        util: Util
    }

    const gameMemory = new GameMemory(dependencias)
    gameMemory.inicializar()
        
}

window.onload = onLoad;