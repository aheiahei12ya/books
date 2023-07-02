const path = require('path')
const url = require('url')
const { app, BrowserWindow, globalShortcut } = require('electron')
const prepareNext = require('./load-nextjs')

if (require('electron-squirrel-startup')) app.quit()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1440,
    height: 960,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false
    }
  })

  win.loadURL(
    app.isPackaged
      ? url.format({
          pathname: path.join(__dirname, '../dist/index.html'),
          protocol: 'file:',
          slashes: true
        })
      : 'http://localhost:3000'
  )
}

app
  .whenReady()
  .then(async () => {
    await prepareNext('.', 3000, true)
  })
  .then(() => {
    createWindow()
  })
  .then(() => {
    globalShortcut.register('f5', function () {})
    globalShortcut.register('CommandOrControl+R', function () {})
  })

app.on('window-all-closed', app.quit)
