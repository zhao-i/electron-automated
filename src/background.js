'use strict'
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
//Keep global reference of the window objectf
let win;
// let workerWindow;

const isDEV = process.env.NODE_ENV !== 'production'
const DevURL = process.env.WEBPACK_DEV_SERVER_URL

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])


async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 626,
    backgroundColor: '#f5f5f5',
    center: true,
    show: false,
    resizable: false,
    fullscreen: false,
    fullscreenable: false,
    frame: false,
    devTools: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    }
  })
  win.on('ready-to-show', () => win.show());
  if (DevURL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(DevURL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

/* function createWorkerWindow() {

  workerWindow = new BrowserWindow({
    show: false,
    frame: false,
    devTools: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  const modalPath = isDEV ? `${DevURL}#/worker` : `file://${__dirname}/index.html#worker`;

  workerWindow.loadURL(modalPath);

} */

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  //macOS配置项
  if (BrowserWindow.getAllWindows().length === 0) createWindow();

})

//electron已经初始化,在这一刻之后才能创建浏览器窗口
app.on('ready', async () => {
  if (isDEV && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  createWindow();
  // createWorkerWindow();

})

// 开发模式下的干净退出功能
if (isDEV) {
  if (process.platform === 'win32') {
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

ipcMain.on('control', (e, code) => {

  //0-关闭窗口,1-最小化,2-托盘,3-迷你面板,4-默认面板
  switch (code) {

    case 0:
      app.quit()
      break;
    case 1: win.minimize();
      break;
    case 2:
      break;
    case 3:
      win.setResizable(true);
      win.setSize(400, 300, true);
      win.setPosition(10, 10);
      win.setAlwaysOnTop(true, 'floating', 1)
      break;
    case 4:
      win.setSize(1000, 626, true);
      win.center();
      win.setResizable(false);
      win.setAlwaysOnTop(false);
      break;

    default: console.log('收到控制数据，但未定义功能')
      break;
  }
})

import { setocr, runocr, stopocr } from './ocr/index.js'

const toRender = (channel, message) => win.webContents.send(channel, message)

ipcMain.on('setdata', (e, args) => {

  const { price, interval, delay, randomDelay } = args;

  setocr(price, interval, delay, randomDelay, toRender);

})

ipcMain.on('toMain', (e, args) => {

  if (args) {

    runocr();

  } else {

    stopocr()

  }
})