/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Default main entry set up app.

*/

//console.log('NL_APPID',NL_APPID);
console.log('NL_OS',NL_OS);
console.log('NL_PORT',NL_PORT);
// https://neutralino.js.org/docs/api/os#ossettrayoptions
function setTray() {
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }
    let tray = {
      icon: "/resources/icons/trayIcon.png",
      menuItems: [
        {id: "APP", text: "App Visible"},
        {id: "VERSION", text: "Get version"},
        {id: "SEP", text: "-"},
        {id: "QUIT", text: "Quit"}
      ]
    };
    Neutralino.os.setTray(tray);
}

// https://neutralino.js.org/docs/api/window
async function toggleAppDisplay(){
  console.log('hello')
  let status = await Neutralino.window.isVisible();
  if(status){
    await Neutralino.window.hide();
  }else{
    await Neutralino.window.show();
  }
}

function onTrayMenuItemClicked(event) {
  switch(event.detail.id) {
    case "APP":
      toggleAppDisplay();
      break;
    case "VERSION":
      Neutralino.os.showMessageBox("Version information",
        `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
      break;
    case "QUIT":
      Neutralino.app.exit();
      break;
  }
}

function onWindowClose() {
  Neutralino.app.exit();
}

// https://neutralino.js.org/docs/api/os/
//Neutralino.os.execCommand('node server.js');

async function serversetup(){
    console.log('init server...')
    //console.log(__dirname)
    //let info = await Neutralino.os.execCommand('node ./server.js');
    //let info = await Neutralino.os.execCommand('node ./server.js');
    //console.log(`server ${info.stdOut}`);

    //let info = await Neutralino.os.execCommand('python --version');
    //console.log(`server ${info.stdOut}`);

    //await Neutralino.os.execCommand('npm start', { background: true });
    //await Neutralino.os.execCommand('npm run dev', { background: true });
}

serversetup();
console.log(window.location);

Neutralino.init();
//Neutralino.window
// https://neutralino.js.org/docs/api/window/
async function init(){
  //await Neutralino.window.setSize({
    //resizable: true
  //});
}

init();

Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
  setTray();
}
console.log('[0]Neutralino init...',0);
//showInfo();