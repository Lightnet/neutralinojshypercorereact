/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript/680982

import React,{createRef, useEffect, useState} from "react";
import useFetch from '../hook/usefetch';
//import ContentEditable from "react-contenteditable";
import styles from './editor.module.css';

export default function HyperDriveContent(){

  const [drive, setDrive] = useState('');
  const [dirList, setDirList] = useState([]);
  const [viewType, setViewType] = useState('dir');// dir, text, image

  const [file,setFile] = useState('');
  //const [textContent,setTextContent] = useState({html:""});
  const [textContent,setTextContent] = useState("");
  const contentEditable = createRef(null);

  useEffect(()=>{
    getDriveDir()
  },[])

  useEffect(()=>{
    if(viewType=='texteditor'){
      contentEditable.current.innerText = textContent;
    }
    if(viewType=='editortextnew'){
      contentEditable.current.innerText = textContent;
    }
  },[viewType])

  async function getDriveDir(){
    let data = await useFetch('http://localhost/drive');
    console.log(data);
    if(data.list){
      setDirList(data.list);
      setViewType('dir');
    }
  }

  function typeTextContent(event){
    //console.log(event.target.innerText);
    console.log(event.target.textContent);

    //setTextContent(event.target.textContent);
    //setTextContent(event.target.innerText);
    //setTextContent(event.currentTarget.textContent);
  }

  function typeFile(event){
    setFile(event.target.value);
  }

  async function getDrive(){

  }

  async function createDrive(){

  }

  function typeDrive(event){
    setDrive(event.target.value)
  }

  async function createTxt(){
    let data = await useFetch('http://localhost/drive',{
        method:'POST'
      , body:JSON.stringify({
          file:file
        , mode:'create'
      })
    });
    console.log(data);
  }

  async function clickEdit(filename){
    let data = await useFetch('http://localhost/drive',{
        method:'POST'
      , body:JSON.stringify({
         file:filename
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


    let data = await useFetch('http://localhost/drive',{
        method:'POST'
      , body:JSON.stringify({
         file:file
        , content:contentEditable.current.innerText
        , mode:'save'
      })
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error get content data.')
      return;
    }
    //if(data.content){
      //setFile(filename);
      //setTextContent(data.content);
      //setViewType('texteditor');
    //}
  }

  async function clickTextCreate(){

    let filestr = file;
    var ext = filestr.substr(filestr.lastIndexOf('.') + 1);
    if(ext=='txt'){

    }else{
      console.log('ext need it...');
      return;
    }

    let data = await useFetch('http://localhost/drive',{
        method:'POST'
      , body:JSON.stringify({
         file:file
        , content:contentEditable.current.innerText
        , mode:'create'
      })
    });
    console.log(data);
    if(data.error){
      console.log('Fetch Error get content data.')
      return;
    }
    //if(data.content){
      //setFile(filename);
      //setTextContent(data.content);
      //setViewType('texteditor');
    //}
  }

  function clickEditCancel(){
    setViewType('dir');
  }

  function clickEditNew(){
    setViewType('editortextnew');
  }

  function clickEditTest(){
    contentEditable.current.innerText = 'test\ntest';
  }

  function viewMode(){
    if(viewType=='dir'){
      return dirList.map((item)=>{
        var ext = item.substr(item.lastIndexOf('.') + 1);
        let bedit = <></>;
        if(ext== 'txt'){
          bedit=<button onClick={()=>clickEdit(item)}>Edit</button>
        }
        console.log(ext);
        return <div key={item}>
            <label> {item}</label> {bedit}
          </div>
      })
    }else if(viewType=='texteditor'){
      {
        //{textContent}
      }
      return <>
        <div
          ref={contentEditable}
          className={styles.textEditor}
          //html={textContent}
          //disabled={false}
          //onChange={typeTextContent}
          //onBlur={e => {console.log(e.currentTarget.textContent);}} 
          suppressContentEditableWarning={true}
          //dangerouslySetInnerHTML={{ __html: textContent }}
          //dangerouslySetInnerHTML={{ __html: textContent }}
          onInput={typeTextContent}
          contentEditable={true}
          >
            
          </div><br />
        <button onClick={clickTextSave}> Save </button>
        <button onClick={clickEditCancel}> Cancel </button>
        <button onClick={clickEditTest}> test </button>
      </>
    }else if(viewType=='editortextnew'){
      return <>
        <label> File Name: </label> <input value={file} onChange={typeFile} /><br />
        <label> Text Content: </label> <br />
        <div 
          ref={contentEditable}
          className={styles.textEditor} 
          //value={textContent} 
          //onChange={typeTextContent} 
          suppressContentEditableWarning={true}
          //dangerouslySetInnerHTML={{ __html: textContent }}
          contentEditable={true}
          >
            {textContent}
        </div><br />
        <button onClick={clickTextCreate}> Save </button>
        <button onClick={clickEditCancel}> Cancel </button>
        <button onClick={clickEditTest}> test </button>
      </>
    }else if(viewType=='image'){
      return <>
        <label> File Name: </label> <input value={file} onChange={typeFile} /><br />
        <button> Delete </button>
        <button onClick={clickEditCancel}> Cancel </button>
      </>
    }
    return <></>
  }

  return <div>
    <button onClick={getDriveDir}> Refresh </button>
    <button onClick={createDrive}> Create </button>
    <button onClick={getDrive}> Get </button>
    <input value={drive} onChange={typeDrive}/>

    <button onClick={createTxt}> CreateTxt </button>
    <button onClick={clickEditNew}> New Text </button>

    <div>
      {viewMode()}
    </div>
  
  </div>
}