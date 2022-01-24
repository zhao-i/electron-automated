const  { contextBridge , ipcRenderer } = require ( "electron" )
/* 
公开 "允许渲染器进程使用" 的受保护方法
在不公开整个对象的情况下使用IPC渲染器 
*/
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain","control","setdata"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["toRender"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);