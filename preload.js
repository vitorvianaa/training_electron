const { contextBridge } = require('electron')

// expondo informações que meu front pode acessar do meu back
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron
})

// manipulação do DOM
window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})

function obterData(){
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return data.toLocaleDateString('pt-br', options)
}