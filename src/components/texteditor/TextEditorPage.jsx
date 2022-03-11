/*
  LICENSE: MIT
  Created by: Lightnet
*/


// https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
// https://reactjs.org/docs/dom-elements.html
// https://lifesaver.codes/answer/react-ace-in-resizable-container-207

import { Button, Classes, Label } from "@blueprintjs/core";
import React,{createRef, useEffect, useState} from "react";
//import useFetch from '../hook/useFetch.mjs';
import {AceEditorRef} from "./AceEditor.jsx";

export default function TextEditorPage(){

  const [file,setFile] = useState('');

  const [mode, setMode] = useState("jsx");
  const [extLangs,setExtLangs] = useState([
      "jsx"
    , "json"
    , "javascript"
    , "html"
    , "css"
  ]);

  const [theme, setTheme] = useState("terminal");
  const [selectThemes,setSelectTheme] = useState([
      "terminal"
    , "twilight"
  ]);

  const [showPrintMargin, setShowPrintMargin] = useState(false);
  const [showGutter, setShowGutter] = useState(true);
  const [highlightActiveLine, setHighlightActiveLine] = useState(true);



  const [content, setContent] = useState(`sdfdf`);
  const aceRef = createRef(null);

  const [size, setSize] = useState({
    editorHeight: "auto",
    editorWidth: "auto"
  });
  

  function onChangeContent(newValue){
    //console.log(e.target.value)
    //console.log(newValue)
    setContent(newValue);
  }

  function clickSave(){
    console.log(content)
  }

  function clickPasteText(){
    setContent("test")
  }

  function onLoad(editorInstance ){
    editorInstance.container.style.resize = "both";
    console.log(editorInstance);
    editorInstance.resize(true)
  }

  function onResize(w, h) {
    console.log(w)
    console.log(h)
    setSize({
      editorHeight: h,
      editorWidth: w
    })
  }

  function clickRef(){
    console.log(aceRef.current)
    //console.log(aceRef.current.container.style.height="100px")
  }
  function clickRef2(){
    console.log(aceRef.current.editor.container.style.height="100px")
  }
  function clickRef3(){
    console.log(aceRef.current.editor.container.style.height="calc(100% - 58px)")
  }
  //<Button small onClick={clickRef}> Ref </Button>
  //<Button small onClick={clickRef2}> Ref2 </Button>
  //<Button small onClick={clickRef3}> Ref3 </Button>
  // https://github.com/securingsincity/react-ace/issues/415
  return <>
    <div>
      
      <Button small onClick={clickPasteText}> Test </Button>
      <label>File Name:</label> <input className={Classes.INPUT+" "+ Classes.SMALL } value={file} onChange={(e)=>setFile(e.target.value)} />
      <Button small onClick={clickSave}> Save </Button>
      <label> Mode: </label>
      <select value={mode} onChange={(e)=>setMode(e.target.value)}>
        <option value={"jsx"}>jsx</option>
        <option value={"json"}>json</option>
        <option value={"javascript"}>javascript</option>
        <option value={"html"}>html</option>
        <option value={"css"}>css</option>
      </select>
      <label> Theme: </label>
      <select value={theme} onChange={(e)=>setTheme(e.target.value)}>
        <option value={"terminal"}>terminal</option>
        <option value={"twilight"}>twilight</option>
      </select>
      <button onClick={(e)=>setShowPrintMargin(state=>!state)}>Print Margin {showPrintMargin ? ("x"):("o")}</button>
      <button onClick={(e)=>setShowGutter(state=>!state)}>Gutter {showGutter ? ("x"):("o")}</button>
      <button onClick={(e)=>setHighlightActiveLine(state=>!state)}> Highlight Active Line {highlightActiveLine ? ("x"):("o")}</button>

    </div>
    <AceEditorRef
      ref={aceRef}
      //style={{height:"100%",width:"100%"}}
      //style={{width:"100%"}}
      height="calc(100% - 50px)"
      width="100%"
      //onResize={onResize}
      //height={size?.editorHeight}
      //width={size?.editorWidth}
      //maxLines={Infinity}
      mode={mode}
      //theme="github"
      //onLoad={onLoad}
      theme={theme}
      value={content}
      onChange={onChangeContent}
      //name="UNIQUE_ID_OF_DIV"
      showPrintMargin={showPrintMargin}
      showGutter={showGutter}
      highlightActiveLine={highlightActiveLine}
      //editorProps={{ $blockScrolling: true }}

      setOptions={{
        //enableBasicAutocompletion: false,
        //enableLiveAutocompletion: false,
        //enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }}
    />
  </>
}