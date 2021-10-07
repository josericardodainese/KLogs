const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
      devTools: false
    }
  })
  mainWindow.setMenuBarVisibility(false);


  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/Klogs/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

app.commandLine.appendSwitch('ignore-certificate-errors');
