const { contextBridge, ipcRenderer } = require('electron')

// expondo informações que meu front pode acessar do meu back
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    open: () => ipcRenderer.send('open-child'),
    send: (message) => ipcRenderer.send('render-message', message),
    on: (message) => ipcRenderer.on('main-message', message),
    info: () => ipcRenderer.send('dialog-info'),
    warning: () => ipcRenderer.send('dialog-warning'),
    select: () => ipcRenderer.send('dialog-select'),
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