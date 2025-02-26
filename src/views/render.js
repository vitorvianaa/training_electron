console.log('processo de renderização... FrontEnd')

// em um projeto Electron, os processos de renderização(front) e o processo principal(back) precisam se comunicar de forma segura
// para isso, existe um arquivo chamado 'preload.js' que é responsavel por fazer essa comunicação de forma segura
// processo no lado do back(main.js) usam recursos do Node.js, e os mesmos não são acessiveis dentro no processo de renderização(render.js)

console.log(`Versao do Electron vindo do back: ${api.verElectron()}`)

function openChild(){
    api.open()
}

api.send('Oi, estou mandando isso do front! ^^')

api.on((event, message) => {
    console.log(message)
})