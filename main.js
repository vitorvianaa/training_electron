console.log('processo do back-end...')
console.log(`Versão Electron: ${process.versions.electron}`)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog } = require('electron')
const path = require('node:path')

const createWindow = () => {
    nativeTheme.themeSource = "light"
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/pc.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // Menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')

}


// janela about
const aboutWindow = () => {
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        icon: './src/public/img/pc.png',
        autoHideMenuBar: true,
        resizable: false
    })

    about.loadFile('./src/views/about.html')
}

// Janela secundaria
const childWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if(father){
        const child = new BrowserWindow({
            width: 600,
            height: 800,
            icon: './src/public/img/pc.png',
            parent: father,
            modal: true
        })

        child.loadFile('./src/views/child.html')
    }
}

app.whenReady().then(() => {
    createWindow()

    // IPC

    ipcMain.on('open-child', () =>{
        childWindow()
    })

    ipcMain.on('render-message', (event, message) => {
        console.log(message)
        event.reply('main-message', 'Estou mandando essa reposta do back! ^^')
    })
    
    ipcMain.on('dialog-info', () =>{
        dialog.showMessageBox({
            type: 'info',
            title: 'Informação',
            message: 'Mensagem',
            buttons: ['OK']
        })
    })

    ipcMain.on('dialog-warning', () => {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Aviso',
            message: 'Confirma essa ação?',
            buttons: ['Sim', 'Não'],
            defaultId: 0
        })
        .then((result) => {
            console.log(result)
            
            if(result.response === 0){
                console.log('Confirmado!!')
            }
        })
    })

    ipcMain.on('dialog-select', () => {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        })
        .then((result) => {
            console.log(result.filePaths)
        })
        .catch((error) => {
            console.log(error)
        })
    })


    // END IPC
})

// template Menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {label: 'Sair', click: () => app.quit(), accelerator: 'Alt+F4'},
            {label: 'Janela Secundaria', click: () => childWindow()}
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {label: 'Recarregar', role: 'reload'},
            {label: 'Ferramentas do Desenvolvedor', role: 'toggleDevTools'},
            {type: 'separator'},
            {label: 'Aumentar Zoom', role: 'zoomIn'},
            {label: 'Reduzir Zoom', role: 'zoomOut'},
            {label: 'Redefinir Zoom', role: 'resetZoom'}
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {label: 'Documentação', click: () => shell.openExternal('https://www.electronjs.org/docs/latest/')},
            {type: 'separator'},
            {label: 'Sobre', click: () => aboutWindow()}
        ]
    },
]