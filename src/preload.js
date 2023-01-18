
import { contextBridge, ipcRenderer } from 'electron'
import { nativeTheme } from 'electron'
window.ipcRenderer = ipcRenderer
// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    let validChannels = ['nameOfClientChannel'] // <-- Array of all ipcRenderer Channels used in the client
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
      console.log(nativeTheme.shouldUseDarkColors)
    }
  },
 
})
alert("It Worked!") // Remove this line once you confirm it worked