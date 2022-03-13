/*
  LICENSE: MIT
  Created by: Lightnet

*/

// https://github.com/neutralinojs/neutralinojs/blob/main/server/router.cpp
// https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript/680982
// 

import { Button, Classes } from "@blueprintjs/core";
import React,{createRef, useEffect, useState} from "react";
import { nanoid16 } from "../../lib/helper.mjs";
import useAxiosTokenAPI from "../hook/useAxiosTokenAPI.jsx";
import { useHyperCore } from "../hypercore/HyperCoreProvider.jsx";
import Modal from "../modal/Modal.jsx";
import HyperDriveTextEditor from "../texteditor/HyperDriveTextEditor.jsx";

var re = /(?:\.([^.]+))?$/;

var textexts=[
  'txt'
  ,'md'
  ,'js'
  ,'xml'
  ,'html'
  ,'log'
  ,'xhtml'
  ,'json'
  ,'css'
];

var imageexts=[
  'png'
  ,'gif'
  ,'jpg'
  ,'svg'
];

function checkTextExt(_filename){
  let ext = re.exec(_filename)[1];
  if(!ext){
    console.log("NULL")
    return false;
  }else{
    ext = ext.toLowerCase();
  }
  if (textexts.indexOf(ext) < 0) {  // Wasn't found
    console.log("NOT FOUND")
    return false;
  }else{// found
    console.log("FOUND")
    return true;
  }
}

function checkImageExt(_filename){
  let ext = re.exec(_filename)[1];
  if(!ext){
    console.log("NULL")
    return false;
  }else{
    ext = ext.toLowerCase();
  }
  if (imageexts.indexOf(ext) < 0) {  // Wasn't found
    console.log("NOT FOUND")
    return false;
  }else{// found
    console.log("FOUND")
    return true;
  }
}

export default function HyperDrive2(){

  const [drive, setDrive] = useState('');// key drive default to local drive
  const [dirname, setDirName] = useState('/'); //default / dir for local drive
  const [dirList, setDirList] = useState([]);
  
  const [tmpDir, setTmpDir] = useState(""); //create and delete dir

  const [toggleDrives, setToggleDrives] = useState(false)
  const [drives, setDrives] = useState([])

  const [showCreateDir, setShowCreateDir] = useState(false);
  const [showDeleteDir, setShowDeleteDir] = useState(false);
  const [showDeleteFile, setShowDeleteFile] = useState(false);

  const [view, setView] = useState("dir");

  const [fileName, setFileName] = useState("");
  const [textContentEdit, setTextContentEdit] = useState("");

  const [fileUpload, setFileUpload] = useState("");

  const {API_URL} = useHyperCore();
  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    //console.log("isLoading: ", isLoading)
    if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
      //console.log("GETTING...: ")
      getDriveDir()
    }
  },[axiosJWT,isLoading])

  //get local dir or 
  async function getDriveDir(){
    if(dirname=='/'){
      axiosJWT.instance.get("/api/hyperdrive")
      .then(function (response) {
        if((response.status==200)&&(response.statusText=="OK")){
          //console.log(response.data)
          let data = response.data;
          console.log(data);
          if(data.error){
            console.log('Fetch Error get dir list.')
            return;
          }
          if(data.list){
            setDirList(data.list);
            //setViewType('dir');
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      DriveDirList(dirname)
    }
  }

  //get dir
  async function DriveDirList(name){
    axiosJWT.instance.post('/api/hyperdrive',{
        dirname:name
      , mode:'dir'
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error get content data.')
          setDirList([]);
          return;
        }
        if(data.list){
          setDirList(data.list);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //change dir
  function clickChangeDir(_dirname){
    if(dirname == "/"){
      setDirName(dirname+_dirname)
    }else{
      setDirName(dirname+"/"+_dirname)
    }
    
    DriveDirList(dirname+"/"+_dirname);
  }

  function clickSetDir(_dirname){
    setDirName(_dirname)
    DriveDirList(_dirname);
  }


  // INPUTS
  function changeFileSelect(event){
    setSelectedFile(event.target.files[0]);
  }

  function clickUploadHandle(event){
    event.preventDefault();
    console.log('upload');
    if(!selectedFile){
      console.log('EMPTY');
      return;
    }
    const formData = new FormData();
    formData.append('File', selectedFile);
    formData.append('dirname', dirname);
    // need to check later for upload
    // https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios

    axiosJWT.instance.post('/api/hyperdriveupload',formData,{
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('axiosJWT Error!');
          return;
        }
    
        if(data.api=='uploaded'){
          setViewType('dir');
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  function typeFileName(e){
    setFileName(e.target.value)
  }

  function typeTextContentEdit(newValue){
    setTextContentEdit(newValue)
  }

  function typeTmpDir(e){
    setTmpDir(e.target.value);
  }

  function onOpenCreateDir(){
    setShowCreateDir(true)
  }

  function onCloseCreateDir(){
    setShowCreateDir(false)
  }

  function onCloseDeleteDir(){
    setShowDeleteDir(false)
  }

  function onCloseDeleteFile(){
    setShowDeleteFile(false)
  }






  // RENDER
  function renderDrives(){
    if(toggleDrives){
      return <>
        <select>
          <option value=""> Select Drive Key 00000000000000000000 </option>
        </select>
      </>
    }else{
      return <>
        <Button icon="key" small > Get </Button>
        <input className={Classes.INPUT + " " + Classes.SMALL} size="64" value={drive} onChange={(e)=>setDrive(e.target.value)} placeholder="Default local drive" />
      </>
    }
  }

  function clickNewDoc(){
    setFileName(nanoid16()+".md")
    setView("texteditor")
  }

  function clickDir(){
    setView("dir")
  }

  // LOAD TEXT FILE
  async function clickEdit(filename){
    axiosJWT.instance.post('/api/hyperdrive',{
      dirname:dirname
      , file:filename
      , mode:'edit'
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error get content data.')
          return;
        }
        if(typeof data.content === 'string'){
          setFileName(filename);
          setTextContentEdit(data.content);
          setView('texteditor');
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  // SAVE TEXT FILE 
  async function clickTextSave(){
    axiosJWT.instance.post('/api/hyperdrive',{
      dirname:dirname
      , file:fileName
      , content:textContentEdit
      , mode:'save'
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error get content data.')
          return;
        }

        setView('dir');
        getDriveDir();
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  // DELETE FILE
  async function clickDeleteFile(filename){
    axiosJWT.instance.delete("/api/hyperdrive",{
      data:{
        dirname:dirname
        , file:filename
        , mode:'delete'
      }
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch Error get content data.')
          return;
        }
    
        setView('dir')
        getDriveDir();
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  // DELETE DIR ASK
  function clickModelDeleteDir(item){
    setTmpDir(item);
    setShowDeleteDir(true);
  }

  //CREATE DIR
  async function clickMakeDir(){
    let dirpath = "/"
    if(dirname == "/"){
      dirpath = dirname + tmpDir;
    }else{
      dirpath = dirname + "/" + tmpDir;
    }

    axiosJWT.instance.post('/api/hyperdrive',{
      dirname:dirpath
      , mode:'mkdir'
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('axiosJWT Error!');
          return;
        }
        getDriveDir()
        setShowCreateDir(false);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //DELETE DIR
  async function clickRemoveDir(){
    let dirpath = "/"
    if(dirname == "/"){
      dirpath = dirname + tmpDir;
    }else{
      dirpath = dirname + "/" + tmpDir;
    }

    axiosJWT.instance.post('/api/hyperdrive',{
      dirname:dirpath
      , mode:'rmdir'
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('axiosJWT Error!');
          return;
        }
        getDriveDir()
        onCloseDeleteDir();
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  function renderDir(){
    if(view=="dir"){
      if(dirname=="/"){
        return <></>
      }else{
        let dirpath = dirname;
        dirpath = dirpath.slice(0,dirpath.lastIndexOf("/"))
        //if(dirpath.lastIndexOf("/"))
        //console.log(dirpath.lastIndexOf("/")==-1){
        if(dirpath.lastIndexOf("/") == -1 ){
          return <><label> / </label> <Button icon="folder-close" small onClick={()=>clickSetDir("/")}> Up Directory </Button><br/></>
        }else{
          return <>
            <label> {dirpath} </label> <Button icon="folder-close" small onClick={()=>clickSetDir(dirpath)}> Up Directory </Button><br/>
          </>
        }
      }
    }
    return <></>
  }

  function renderView(){
    if(view=="dir"){
      return dirList.map((item)=>{

        var ext = re.exec(item)[1];
        //var ext = item.substr(item.lastIndexOf('.') + 1);
        let bedit = <></>;
        let bdelete = <></>;
        let bdowload = <></>;
        let bdowloadlink = <></>;
        let bcd = <></>;
        let bimg = <></>;
        //bdowloadlink=<a href={"http://localhost/download"+dirname+"/"+item} target="_blank">Download</a>
        console.log("NAME:",item);
        checkTextExt(item);
        if(ext){
          if(checkTextExt(item)==true){
            bedit=<Button icon="edit" small onClick={()=>clickEdit(item)}>Edit</Button>
            //bdowload=<Button icon="download" small onClick={()=>clickDownload(item)}>Download</Button>
            //bdowloadlink=<a href={API_URL+"/api/download"+dirname+"/"+item} >Download</a>
            bdelete=<Button icon="trash" small onClick={()=>clickDeleteFile(item)}> Delete </Button>
          }
          if(checkImageExt(item)==true){
            //bimg=<img src={"http://localhost/hyperdrive"+"/"+item} />
            //bimg=<Button small onClick={()=>viewImage(item)}> View Image </Button>
          }
        }else{
          bcd = <>
          <Button icon="folder-close" small onClick={()=>clickChangeDir(item)}>Directory</Button>
          <Button icon="trash" small onClick={()=>clickModelDeleteDir(item)}>Delete</Button>
          </>
        }
        
        //console.log("NAME:",item)
        //console.log(ext);
        return <div key={item}>
            <label> {item}</label> {bimg} {bcd} {bdowloadlink} {bdowload} {bedit} {bdelete}
          </div>
      })
    }else if(view=="upload"){
      return <>
        <label> File Name: </label>
        <input type="file" onChange={changeFileSelect} />
        <Button icon="upload" small onClick={clickUploadHandle}> Upload </Button>
        <Button icon="cross" small onClick={clickDir}> Cancel </Button>
      </>
    }else if(view=="texteditor"){
      return <> 
        <input value={fileName} onChange={typeFileName}/>
        <Button small onClick={clickTextSave}> Save </Button>
        <Button small onClick={clickDir}> Cancel </Button>
        <HyperDriveTextEditor value={textContentEdit} onChange={typeTextContentEdit} />
        </>
    }else if(viewType=='image'){
      return <>
        <label> File Name:{imageFile} </label> <Button small> Delete </Button> <Button small onClick={clickEditCancel}> Cancel </Button> <br />
        <img src={imageFile} />
      </>
    }
    return <></>
  }

  return <>
    <div style={{
    width:"100%",
    height:"calc(100% - 18px)"
    }}>
      <div>
        <Button icon="refresh" small onClick={getDriveDir}> Refresh </Button>
        <Button icon="build" small onClick={clickDir}> Create </Button>
        <Button icon="menu" small onClick={(e)=>setToggleDrives(state=>!state)}> Drives </Button>
        {renderDrives()}
      </div>
      <div>
        <label> Directory: </label>
        <input className={Classes.INPUT + " " + Classes.SMALL} size="64" value={dirname} onChange={(e)=>setDirName(e.target.value)} />
        <Button icon="folder-new" small onClick={onOpenCreateDir}> mkdir </Button>
        <Button icon="document" small onClick={clickNewDoc}> New Doc</Button>
        <Button icon="upload" small> Upload </Button>
      </div>
      <div style={{width:"100%",height:"calc(100% - 72px)"}}>
        {renderDir()}
        {renderView()}
      </div >
    </div>

    <div style={{
      position:"absolute"
    , top:"0px"
    , left:"0px"
    //, width:"100%"
    //, height:"100%"
    }}>
      <Modal isOpen={showCreateDir} onClose={onCloseCreateDir}>
        <label>Name Dir:</label>
        <input value={tmpDir} onChange={typeTmpDir}></input><br/>
        <Button small intent="primary" onClick={clickMakeDir}> Create </Button>
        <Button small onClick={onCloseCreateDir}> Cancel </Button>
      </Modal>

      <Modal isOpen={showDeleteDir} onClose={onCloseDeleteDir}>
        <label>Delete Dir?</label>
        <label> {tmpDir} </label><br/>
        <Button small intent="danger" onClick={clickRemoveDir}> Delete </Button>
        <Button small onClick={onCloseDeleteDir}> Cancel </Button>
      </Modal>

      <Modal isOpen={showDeleteFile} onClose={onCloseDeleteFile}>
        <label>Delete File?</label>
        <label> {tmpDir} </label><br/>
        <Button small intent="warning"> Delete </Button>
        <Button small intent="primary" onClick={onCloseDeleteFile}> Delete </Button>
      </Modal>

    </div>
  </>
}