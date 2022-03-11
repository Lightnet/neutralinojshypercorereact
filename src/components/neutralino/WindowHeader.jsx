

import React, { useEffect } from "react";
import ThemeButton from "../theme/ThemeButton.jsx";
import { Button } from "@blueprintjs/core";

export default function WindowHeader(){

  useEffect(async()=>{
    if(Neutralino){
      await Neutralino.window.setDraggableRegion('WindowHeader');
      //await Neutralino.window.unsetDraggableRegion('IconRight');
    }
  },[])

  const style={
    position:'fixed'
    , top:'0px'
    , left:'0px'
    , width:'100%'
    , height:'24px'
    //, background:'#A9A9A9'
    , WebKitAppRegion:'drag'
  };

  async function windowMini(){
    //console.log('minimize');
    if(!Neutralino)return;
    await Neutralino.window.minimize();
  }

  async function clickToggleScreen(){
    if(!Neutralino)return;
    let status = await Neutralino.window.isFullScreen();
    if(status){
      await Neutralino.window.exitFullScreen();
    }else{
      await Neutralino.window.setFullScreen();
    }
  }

  async function clickClose(){
    //console.log('close');
    if(!Neutralino)return;
    await Neutralino.app.exit();
  }

  async function clickReload(){
    //console.log('close');
    if(!Neutralino)return;
    await Neutralino.app.restartProcess({ args: '--restarted' });
  }

  function clickRefresh(){
    //window.location.href = 'http://localhost:3000';
    //window.location.replace('http://localhost:3000');
    window.location = ('http://localhost:3000') 
    //location.reload();
  }

  return <>
    <div id="WindowHeader" className="headerp" style={style}>
      
    </div>
    <div style={{position:'fixed',left:'0px',top:'0px'}}>
      <img className="imgbtn" height='18px' width='18px' src="/icons/menulist.svg"></img>
      <Button icon="reset" small onClick={clickReload} >Reload</Button>
      <Button icon="refresh" small onClick={clickRefresh}>Refresh</Button>
      <ThemeButton></ThemeButton>
    </div>
    <div style={{position:'fixed',right:'0px',top:'0px'}}>
      <Button icon="small-minus" small onClick={windowMini}></Button>
      <Button icon="maximize" small onClick={clickToggleScreen}></Button>
      <Button icon="cross" small onClick={clickClose}></Button>
    </div>
  </>
}
// note layer effect drag