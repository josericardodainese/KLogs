# KLogs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Libs
```shell
Install the normalize.css library:

npm install --save normalize.css
Import it in your styles.css

@import '~normalize.css';
```
```shell
ng add @angular/material
```

```json
{
  "electron:package:mac": "npm run build && electron-builder -m -c.extraMetadata.main=dist/Klogs/index.html",
  "electron:package:win": "npm run build && electron-builder -w -c.extraMetadata.main=dist/Klogs/index.html",
  "electron:package:linux": "npm run build && electron-builder -l -c.extraMetadata.main=dist/Klogs/index.html"

  "build": {
    "appId": "josericardodainese.app.utils.klogs",
    "files": [
      "dist/**/*"
    ],
    "directories": {
      "buildResources": "public"
    },
    "mac": {
      "target": "dmg"
    },
    "win": {
      "target": "nsis",
      "icon": "build/icon.ico"
    },
    "linux": {
      "target": [
        "AppImage",
        "deb"
      ]
    }
  }
}
```

https://www.vivaolinux.com.br/topico/Wine-Wine-X-Cedega/NO_PUBKEY-E0F72778C4676186
https://blog.aaronlenoir.com/2017/03/03/building-electron-apps-for-windows-on-debian/

```shell
sudo apt-get install mono-complete


$ sudo apt-get install winetricks
$ winetricks dotnet40
```


https://github.com/electron/windows-installer/issues/189
