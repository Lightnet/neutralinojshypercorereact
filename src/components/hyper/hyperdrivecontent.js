/*
  LICENSE: MIT
  Created by: Lightnet

*/

// https://github.com/neutralinojs/neutralinojs/blob/main/server/router.cpp
// https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript/680982
// s

import React,{createRef, useEffect, useState} from "react";
import { nanoid16 } from "../../lib/helper.mjs";
import useFetch from '../hook/usefetch';
//import ContentEditable from "react-contenteditable";
import styles from './editor.module.css';

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

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected,setIsSelected] = useState(false);

  //mount once
  useEffect(()=>{
    getDriveDir()
  },[])

  //event for text editor set up
  useEffect(()=>{
    if(viewType=='texteditor'){
      contentEditable.current.innerText = textContent;
    }
    if(viewType=='editortextnew'){
      contentEditable.current.innerText = textContent;
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
      let data = await useFetch('/drive');
      //console.log(data);
      if(data.error){
        console.log('Fetch Error get dir list.')
        return;
      }
      if(data.list){
        setDirList(data.list);
        setViewType('dir');
      }
    }else{
      DriveDirList(dirname)
    }
  }

  function typeTextContent(event){
    //console.log(event.target.innerText);
    //console.log(event.target.textContent);
    //setTextContent(event.target.textContent);
    //setTextContent(event.target.innerText);
    //setTextContent(event.currentTarget.textContent);
  }

  function typeFile(event){
    setFile(event.target.value);
  }

  async function getDrive(){
    let data = await useFetch('/drive',{
        method:'POST'
      , body:JSON.stringify({
        mode:'drivekey'
      })
    });
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

  async function createDrive(){

  }

  function typeDrive(event){
    setDrive(event.target.value)
  }

  function viewImage(_filename){
    let tmpFile = _filename;
    if(dirname == "/"){
      tmpFile = "http://localhost/drive/" + tmpFile;
    }else{
      tmpFile = "http://localhost/drive" + dirname + "/" + tmpFile;
    }

    setImageFile(tmpFile);
    setViewType('image');
  }

  async function clickEdit(filename){
    let data = await useFetch('/drive',{
        method:'POST'
      , body:JSON.stringify({
          dirname:dirname
        , file:filename
        , mode:'edit'
      })
    });
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

  async function clickTextSave(){
    //console.log("contentEditable.current.textContent");
    //console.log(contentEditable.current.textContent);
    console.log(contentEditable.current.innerHTML);

    let data = await useFetch('/drive',{
        method:'POST'
      , body:JSON.stringify({
          dirname:dirname
        , file:file
        , content:contentEditable.current.innerText
        , mode:'save'
      })
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error get content data.')
      return;
    }

    setViewType('dir');
    getDriveDir();

    //if(data.content){
      //setFile(filename);
      //setTextContent(data.content);
      //setViewType('texteditor');
    //}
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

    let data = await useFetch('/drive',{
        method:'POST'
      , body:JSON.stringify({
          dirname:dirname
        , file:file
        , content:contentEditable.current.innerText
        , mode:'create'
      })
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error get content data.')
      return;
    }

    setViewType('dir');
    getDriveDir();
    //if(data.content){
      //setFile(filename);
      //setTextContent(data.content);
      //setViewType('texteditor');
    //}
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
    let data = await useFetch('/drive',{
        method:'DELETE'
      , body:JSON.stringify({
          dirname:dirname
        , file:filename
        , mode:'delete'
      })
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error get content data.')
      return;
    }

    setViewType('dir')
    getDriveDir();
  }

  async function clickMakeDir(){
    let data = await useFetch('/drive',{
        method:'POST'
      , body:JSON.stringify({
        dirname:createDirName
        , mode:'mkdir'
      })
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error get content data.')
      return;
    }
  }

  async function clickRemoveDir(){
    let data = await useFetch('/drive',{
        method:'POST'
      , body:JSON.stringify({
        dirname:createDirName
        , mode:'rmdir'
      })
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error get content data.')
      return;
    }
  }

  function clickUpload(event){
    event.preventDefault();
    setViewType('upload');
  }

  function clickDeleteDir(){
    
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
    fetch(
			'/driveupload',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
        if(result.message=='uploaded'){
          setViewType('dir');
        }
			})
			.catch((error) => {
				console.error('Error:', error);
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
            bedit=<button onClick={()=>clickEdit(item)}>Edit</button>
            bdowload=<button onClick={()=>clickDownload(item)}>Download</button>
            bdowloadlink=<a href={"http://localhost/download"+dirname+"/"+item} >Download</a>
            bdelete=<button onClick={()=>clickDeleteFile(item)}> Delete </button>
          }
          if(checkImageExt(item)==true){
            //bimg=<img src={"http://localhost/drive"+"/"+item} />
            bimg=<button onClick={()=>viewImage(item)}> View Image </button>
          }
        }else{
          bcd = <button onClick={()=>clickChangeDir(item)}>Dir</button>
        }
        
        //console.log("NAME:",item)
        //console.log(ext);
        return <div key={item}>
            <label> {item}</label> {bimg} {bcd} {bdowloadlink} {bdowload} {bedit} {bdelete}
          </div>
      })
    }else if(viewType=='texteditor'){

      return <>
        <div
          ref={contentEditable}
          className={styles.textEditor}
          suppressContentEditableWarning={true}
          onInput={typeTextContent}
          contentEditable={true}
          >
            
          </div><br />
        <button onClick={clickTextSave}> Save </button>
        <button onClick={clickEditCancel}> Cancel </button>
      </>
    }else if(viewType=='editortextnew'){
      return <>
        <label> File Name: </label> <input size="64" value={file} onChange={typeFile} /><br />
        <label> Text Content: </label> <br />
        <div 
          ref={contentEditable}
          className={styles.textEditor} 
          suppressContentEditableWarning={true}
          //dangerouslySetInnerHTML={{ __html: textContent }}
          contentEditable={true}
          >
            {textContent}
        </div><br />
        <button onClick={clickTextCreate}> Save </button>
        <button onClick={clickEditCancel}> Cancel </button>
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
        <button onClick={clickUploadHandle}> Upload </button>
        <button onClick={clickEditCancel}> Cancel </button>
      </>
    }
    return <></>
  }

  async function DriveDirList(name){
    let data = await useFetch('/drive',{
        method:'POST'
      , body:JSON.stringify({
          dirname:name
        , mode:'dir'
      })
    });
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
  // https://www.codegrepper.com/code-examples/javascript/download+file+from+url+in+react
  // https://javascript.plainenglish.io/downloading-files-in-react-native-with-rnfetchblob-f78b18b46a36
  async function clickDownloadTest(){
    let fileURL = 'test.txt';
    fetch('http://localhost/download/' + fileURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        fileURL,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
  }

  async function clickDownload(filename){
    let fileURL = dirname + filename;
    fetch('http://localhost/download' + fileURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
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
    });
  }
  
  return <div>
    <div>
      <button onClick={clickRefresh}> Refresh </button>
      <button onClick={createDrive}> Create </button>
      <button onClick={getDrive}> Get </button>
      <input size="64" value={drive} onChange={typeDrive}/>
    </div>
    <div>
      <button onClick={clickEditNew}> New Text File </button>
      <button onClick={clickUpload}> Upload </button>
      <button onClick={clickMakeDir}> mkdir </button>
      <button onClick={clickRemoveDir}> rmdir </button>
      <input size="64" value={createDirName} onChange={typeCreateDirName}></input>
    </div>
    
    <div>
      <label> Directory </label><input size="64" value={dirname} onChange={typeDirName} onKeyUp={typeDirEnter} />
    </div>
    <div>
      {viewMode()}
    </div>
  
  </div>
}