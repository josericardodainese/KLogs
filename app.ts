const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow: any;

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

/***
 * Code That Save Log File
 */

const { writeFile } = require('fs');
const { ipcMain, dialog } = require('electron');


const onRendererSalvarLogFile = async (event: any, mensagem: any) => {
  const conteudoDoArquivo = mensagem;

  const { filePath, canceled } = await dialog.showSaveDialog();

  if(canceled) {
    event.reply('main/salvar_arquivo', { status: 400, msg: 'Usuário cancelou o salvamento do arquivo' })
    return false;
  }

  writeFile(filePath, conteudoDoArquivo, 'utf-8', function(err: any, result: any) {
    console.log(err, result);
    console.log(filePath);
    event.reply('main/salvar_log_file', { status: 200, msg: filePath })
  });

  return;
};

ipcMain.on('renderer/salvar_log_file', onRendererSalvarLogFile);
