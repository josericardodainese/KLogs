const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

const args = process.argv.slice(1)
const serve = args.some((val) => val === "--serve");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      webSecurity: false,
      devTools: false
    }
  })
  mainWindow.maximize();
  mainWindow.setMenuBarVisibility(false);

  if (serve) {
    require("electron-reload")(__dirname, {
      electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    });
    mainWindow.loadURL("http://localhost:4200");
  } else {
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
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

app.commandLine.appendSwitch('ignore-certificate-errors');
