
import { contextBridge, ipcRenderer } from 'electron'

const WINDOW_API = {
  greet: (message) => ipcRenderer.send("greet", message),
  getOs: () => ipcRenderer.invoke("get/os"),
  getTheme : () => ipcRenderer.invoke("get/theme"),
  minimize: (message) => ipcRenderer.send("minimize",message),
  maximize: (message) => ipcRenderer.send("maximize",message),
  close: (message) => ipcRenderer.send("close",message),

  // eslint-disable-next-line no-unused-vars
  theme: (message) => ipcRenderer.on("theme",(event, args) => {
    
  }),
  // eslint-disable-next-line no-unused-vars
  os: (message) => ipcRenderer.on("os",(event, args) => {
    
  }),
}
contextBridge.exposeInMainWorld("api", WINDOW_API);




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