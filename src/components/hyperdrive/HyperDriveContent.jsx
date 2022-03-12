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
import HyperDriveTextEditor from "../texteditor/HyperDriveTextEditor.jsx";
//import styles from './editor.module.css';

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

export default function HyperDriveContent(){

  const [drive, setDrive] = useState('');
  const [dirname, setDirName] = useState('/');
  const [createDirName, setCreateDirName] = useState('/');
  const [dirList, setDirList] = useState([]);
  const [viewType, setViewType] = useState('dir');// dir, text, image, upload

  const [file,setFile] = useState('');
  const [imageFile,setImageFile] = useState('');
  const [textContent,setTextContent] = useState("");
  const contentEditable = createRef(null);
  const [textEditor, setTextEditor] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected,setIsSelected] = useState(false);

  const {API_URL} = useHyperCore();

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    //console.log("axiosJWT init...");
    //console.log("isLoading: ", isLoading)
    if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
      //console.log("GETTING...: ")
      getDriveDir()
    }
  },[axiosJWT,isLoading])

  //mount once
  //useEffect(()=>{
    //getDriveDir()
  //},[])

  //event for text editor set up
  useEffect(()=>{
    if(viewType=='texteditor'){
      //contentEditable.current.innerText = textContent;
      setTextEditor(textContent);
    }
    if(viewType=='editortextnew'){
      //contentEditable.current.innerText = textContent;
      setTextEditor(textContent);
    }
  },[viewType])

  function typeDirName(event){
    setDirName(event.target.value)
  }

  function typeCreateDirName(event){
    setCreateDirName(event.target.value)
  }

  function clickRefresh(){
    setViewType('dir');
    getDriveDir();
  }

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
              setViewType('dir');
            }

            if(data.api=='BASE'){
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

  function typeTextEditor(newValue){
    console.log(newValue)
    setTextEditor(newValue)
  }

  function typeFile(event){
    setFile(event.target.value);
  }

  async function getDrive(){
    axiosJWT.instance.post('/api/hyperdrive',{
        api:API.TYPES.CREATE
      , mode:'drivekey'
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
        if(data.api=='drivekey'){
          setDrive(data.key);
          return;
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function createDrive(){

  }

  function typeDrive(event){
    setDrive(event.target.value)
  }

  function viewImage(_filename){
    let tmpFile = _filename;
    if(dirname == "/"){
      tmpFile = "http://localhost/hyperdrive/" + tmpFile;
    }else{
      tmpFile = "http://localhost/hyperdrive" + dirname + "/" + tmpFile;
    }

    setImageFile(tmpFile);
    setViewType('image');
  }

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
          setFile(filename);
          setTextContent(data.content);
          //contentEditable.current.innerText = data.content;
          setViewType('texteditor');
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  async function clickTextSave(){

    axiosJWT.instance.post('/api/hyperdrive',{
      dirname:dirname
      , file:file
      , content:textEditor
      , mode:'save'
    })
    .then(function (response) {
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        console.log(data);
        if(data.error){
          console.log('Fetch Error get content data.')
          return;
        }

        setViewType('dir');
        getDriveDir();
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }
// https://stackoverflow.com/questions/42300528/javascript-phps-substr-alternative-on-javascript
  async function clickTextCreate(){

    let filestr = file;
    //var ext = filestr.substring(filestr.lastIndexOf('.') + 1);
    if(checkTextExt(filestr)==true){

    }else{
      console.log('ext need it...');
      return;
    }

    axiosJWT.instance.post('/api/hyperdrive',{
      dirname:dirname
      , file:file
      , content:textEditor
      , mode:'create'
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
    
        setViewType('dir');
        getDriveDir();
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  function clickEditCancel(event){
    event.preventDefault();
    setViewType('dir');
  }

  function clickEditNew(){
    setViewType('editortextnew');
    setFile(nanoid16()+'.txt')
  }

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
    
        setViewType('dir')
        getDriveDir();
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  async function clickMakeDir(){
    axiosJWT.instance.post('/api/hyperdrive',{
      dirname:createDirName
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
    
        if(data.api=='UPDATE'){
    
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  async function clickRemoveDir(){

    axiosJWT.instance.post('/api/hyperdrive',{
      dirname:createDirName
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
    
        if(data.api=='UPDATE'){
    
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  function clickUpload(event){
    event.preventDefault();
    setViewType('upload');
  }

  function changeFileSelect(event){
    setSelectedFile(event.target.files[0]);
		setIsSelected(true);
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

  function viewMode(){
    if(viewType=='dir'){
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
            bdowload=<Button icon="download" small onClick={()=>clickDownload(item)}>Download</Button>
            bdowloadlink=<a href={API_URL+"/api/download"+dirname+"/"+item} >Download</a>
            bdelete=<Button icon="trash" small onClick={()=>clickDeleteFile(item)}> Delete </Button>
          }
          if(checkImageExt(item)==true){
            //bimg=<img src={"http://localhost/hyperdrive"+"/"+item} />
            bimg=<Button small onClick={()=>viewImage(item)}> View Image </Button>
          }
        }else{
          bcd = <Button icon="folder-close" small onClick={()=>clickChangeDir(item)}>Directory</Button>
        }
        
        //console.log("NAME:",item)
        //console.log(ext);
        return <div key={item}>
            <label> {item}</label> {bimg} {bcd} {bdowloadlink} {bdowload} {bedit} {bdelete}
          </div>
      })
    }else if(viewType=='texteditor'){

      return <>
        <label> File Name: {file} </label>
        <Button icon="saved" small onClick={clickTextSave}> Save </Button>
        <Button icon="cross" small onClick={clickEditCancel}> Cancel </Button>
        <HyperDriveTextEditor
          value={textEditor}
          onChange={typeTextEditor}
        />
      </>
    }else if(viewType=='editortextnew'){
      return <>
        <label> File Name: </label> <input className={Classes.INPUT + " " + Classes.SMALL} size="64" value={file} onChange={typeFile} />
        <Button icon="saved" onClick={clickTextCreate}> Save </Button>
        <Button icon="cross" onClick={clickEditCancel}> Cancel </Button><br/>
        <HyperDriveTextEditor
          value={textEditor}
          onChange={typeTextEditor}
        />
        
      </>
    }else if(viewType=='image'){
      return <>
        <label> File Name:{imageFile} </label> <button> Delete </button> <button onClick={clickEditCancel}> Cancel </button> <br />
        <img src={imageFile} />
      </>
    }else if(viewType=='upload'){
      return <>
        <label> File Name: </label>
        <input type="file" name="file" onChange={changeFileSelect} />
        <Button icon="upload"  small onClick={clickUploadHandle}> Upload </Button>
        <Button icon="cross" small onClick={clickEditCancel}> Cancel </Button>
      </>
    }
    return <></>
  }

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

  function clickChangeDir(_dirname){
    if(dirname == "/"){
      setDirName(dirname+_dirname)
    }else{
      setDirName(dirname+"/"+_dirname)
    }
    
    DriveDirList(dirname+"/"+_dirname);
  }

  function typeDirEnter(event){
    console.log(event.code);
    if(event.code=='Enter'){
      DriveDirList(event.target.value);
    }
  }

  // https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
  async function clickDownload(filename){
    let fileURL="";
    if(dirname == "/"){
      fileURL = dirname + filename;
    }else{
      fileURL = dirname +"/"+ filename;
    }
    
    axiosJWT.instance.get("/api/download"+ fileURL,{
      responseType: 'blob', // important
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
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download',filename,);
          //link.setAttribute('download',true,);
          link.setAttribute('target','_blank');
          // Append to html link element page
          document.body.appendChild(link);
          // Start download
          link.click();
          // Clean up and remove the link
          link.parentNode.removeChild(link);

        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  
  return <div style={{
    width:"100%",
    height:"calc(100% - 18px)"
    }}>
    <div>
      <Button icon="refresh" small onClick={clickRefresh}> Refresh </Button>
      <Button icon="build" small onClick={createDrive}> Create </Button>
      <Button icon="key" small onClick={getDrive}> Get </Button>
      <input className={Classes.INPUT + " " + Classes.SMALL} size="64" value={drive} onChange={typeDrive} placeholder="Default local drive" />
    </div>
    <div>
      <Button icon="document" small onClick={clickEditNew}> New Text File </Button>
      <Button icon="upload" small onClick={clickUpload}> Upload </Button>
      <Button icon="folder-new" small onClick={clickMakeDir}> mkdir </Button>
      <Button icon="remove" small onClick={clickRemoveDir}> rmdir </Button>
      <input className={Classes.INPUT + " " + Classes.SMALL} size="64" value={createDirName} onChange={typeCreateDirName}></input>
    </div>
    
    <div>
      <label> Directory </label><input className={Classes.INPUT + " " + Classes.SMALL} size="64" value={dirname} onChange={typeDirName} onKeyUp={typeDirEnter} />
    </div>
    <div style={{
      width:"100%",
      height:"calc(100% - 72px)"
      }}>
      {viewMode()}
    </div>
  
  </div>
}