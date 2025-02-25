//console.log('processo principal iniciado...')
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron')

const createWindow = () => {
    nativeTheme.themeSource = "light"
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './scr/public/img/pc.png'
    })

    // Menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./scr/views/index.html')

}


// janela about
const aboutWindow = () => {
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        icon: './scr/public/img/pc.png',
        autoHideMenuBar: true,
        resizable: false
    })

    about.loadFile('./scr/views/about.html')
}

app.whenReady().then(() => {
    createWindow() 
    //aboutWindow()
})

// template Menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {label: 'Sair', click: () => app.quit(), accelerator: 'Alt+F4'}
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