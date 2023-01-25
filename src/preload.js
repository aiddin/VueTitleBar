
import { contextBridge, ipcRenderer } from 'electron'

const WINDOW_API = {
  greet: (message) => ipcRenderer.send("greet", message),
  getOs: () => ipcRenderer.invoke("get/os"),
  getTheme : () => ipcRenderer.invoke("get/theme"),
  
}
contextBridge.exposeInMainWorld("api", WINDOW_API);

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