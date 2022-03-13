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

export default function HyperDriveTextEditor({value,onChange}){

  //const [fileName,setFileName] = useState('');
  const [fontSize,setFontSize] = useState(24);
  const [fontSizes,setFontSizes] = useState([
      14
    , 16
    , 18
    , 20
    , 24
    , 28
    , 32
    , 40
  ]);
  const [mode, setMode] = useState("jsx");
  const [extLangs,setExtLangs] = useState([
      "jsx"
    , "json"
    , "javascript"
    , "html"
    , "css"
  ]);

  const [theme, setTheme] = useState("twilight");
  const [selectThemes,setSelectTheme] = useState([
      "terminal"
    , "twilight"
  ]);

  const [showPrintMargin, setShowPrintMargin] = useState(false);
  const [showGutter, setShowGutter] = useState(true);
  const [highlightActiveLine, setHighlightActiveLine] = useState(true);

  const [content, setContent] = useState(``);
  const aceRef = createRef(null);

  useEffect(()=>{
    setContent(value)
  },[value])

  useEffect(()=>{
    setContent(value)
  },[value])

  function onChangeContent(newValue){
    //console.log(newValue)
    setContent(newValue);
    if(onChange){
      onChange(newValue);
    }
  }

  return <>
    <div style={{
      width:"100%"
      , height:"calc(100% - 48px)"
    }}>
      <div>
        <label> Mode: </label>
        <select value={mode} onChange={(e)=>setMode(e.target.value)}>
          {extLangs.map(item=><option key={item} value={item}> {item} </option>) }
        </select>
        <label> Theme: </label>
        <select value={theme} onChange={(e)=>setTheme(e.target.value)}>
          {selectThemes.map(item=><option key={item} value={item}> {item} </option>) }
        </select>
        <label> Font Size: </label>
        <input maxLength="4" size="4" type="number" value={fontSize} onChange={(e)=>setFontSize(Number(e.target.value))}/>
        <Button small onClick={(e)=>setShowPrintMargin(state=>!state)}>Print Margin {showPrintMargin ? ("x"):("o")}</Button>
        <Button small onClick={(e)=>setShowGutter(state=>!state)}>Gutter {showGutter ? ("x"):("o")}</Button>
        <Button small onClick={(e)=>setHighlightActiveLine(state=>!state)}> Highlight {highlightActiveLine ? ("x"):("o")}</Button>

      </div>
      <AceEditorRef
        ref={aceRef}
        height="calc(100% - 2px)"
        width="100%"
        fontSize={fontSize}
        mode={mode}
        theme={theme}
        value={content}
        onChange={onChangeContent}
        name="HyperDriveTextEditor"
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
    </div>
  </>
}