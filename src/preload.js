
import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('ipcRenderer', {
 send: (channel, data) => {// whitelist channels
   let validChannels = ['toMain']
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    on: (channel, func) => {
      let validChannels = ['electronMessage'] // <-- Array of all ipcMain Channels used in the electron
      if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`
          ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
  }

  
})
console.log(process.platform)
// window.onload = () => {
//   const { dialog } = require("electron").remote;
//   window.electron = {};
//   window.electron.dialog = dialog; // now set properly\
//   dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] }).then((result) => {
//     console.log(result.canceled);
//     console.log(result.filePaths);
//   }).catch((err) => {
//     console.log(err);
//   });
// };


// alert("It Worked!") // Remove this line once you confirm it worked