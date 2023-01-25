'use strict'
//MAIN PROCESS2
import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

const {ipcMain} = require('electron')

const isDevelopment = process.env.NODE_ENV !== 'production'
const nativeTheme = require('electron').nativeTheme
const path = require('path')
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  console.log('hehe first')
  const win = new BrowserWindow({
    frame: false,
    transparent: true,
    titleBarStyle: 'hiddenInset',
    overflow: 'hidden', 
    width: 800,
    height: 600,
    webPreferences: {
      
     
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  win.webContents.insertCSS('::-webkit-scrollbar { display: none;} ');
  if ((process.platform) === 'win32') {
    if (nativeTheme.shouldUseDarkColors !== true) {
      console.log('dark')
    console.log(nativeTheme.shouldUseDarkColors)}
    console.log('sending')
  }

  win.webContents.once('did-finish-load', () => {
    win.webContents.send('dark', nativeTheme.shouldUseDarkColors)
    win.webContents.send('os', process.platform)
   })
//   win.webContents.insertCSS( {
//     -ms-overflow-style: none;  /* Internet Explorer 10+ */
// })`

//win.webContents.insertCSS(::-webkit-scrollbar { 
//     display: none;  /* Safari and Chrome */
// })

  

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
    console.log('hehe')
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    
  }
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform === 'darwin') {
    app.quit()
  }
})


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    console.log(process.platform)
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {

      app.quit()
    })
  }
}

ipcMain.on("greet", (event, args) => {
  console.log(args)
})
 // eslint-disable-next-line no-unused-vars
 ipcMain.handle("get/os", async (event, args) => {
  var Os = process.platform
  return Os;
 });
 // eslint-disable-next-line no-unused-vars
 ipcMain.handle("get/theme", async (event, args) => {
 var colors = nativeTheme.shouldUseDarkColors
  return colors;
 });
 ipcMain.on("minimize", (event, args) => {
  console.log(args)
  BrowserWindow.getFocusedWindow().minimize()
  });
  
 // eslint-disable-next-line no-unused-vars
 ipcMain.on("maximize", function(event) {
  if(BrowserWindow.getFocusedWindow().isMaximized()) {
      BrowserWindow.getFocusedWindow().unmaximize();
  } else {
      BrowserWindow.getFocusedWindow().maximize();
  }
});

 ipcMain.on("close", (event, args) => {
  console.log(args)
  BrowserWindow.getFocusedWindow().close()
 });