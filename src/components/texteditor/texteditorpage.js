/*
  LICENSE: MIT
  Created by: Lightnet
*/


// https://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
// https://reactjs.org/docs/dom-elements.html

import React,{createRef, useEffect, useState} from "react";
import useFetch from '../hook/usefetch';
import styles from './editor.module.css';

const EditableElement = (props) => {
  const { onChange } = props;
  const element = useRef();
  let elements = React.Children.toArray(props.children);
  if (elements.length > 1) {
    throw Error("Can't have more than one child");
  }
  const onMouseUp = () => {
    const value = element.current?.value || element.current?.innerText;
    onChange(value);
  };
  useEffect(() => {
    const value = element.current?.value || element.current?.innerText;
    onChange(value);
  }, []);
  elements = React.cloneElement(elements[0], {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: onMouseUp
  });
  return elements;
};

function EditContent({props}){

  const editableRef = useRef();

  return <div
    {...props}
    ref={editableRef}
    //suppressContentEditableWarning={true}
    contentEditable={true}
    //spellCheck={false}
    className={styles.textEditor}
  >
  </div>
}


export default function TextEditor(){

  const [file,setFile] = useState('');
  //const [textContent,setTextContent] = useState({html:""});
  const [textContent,setTextContent] = useState("");
  const contentEditable = createRef(null);

  function typeTextContent(event){
    //console.log(event.target.innerText);
    console.log('event.target');
    //console.log(event.target.textContent);
    console.log(event.target.innerHTML );// this for html 
    console.log(event.target.innerText );// used this for filename.txt raw

    //setTextContent(event.target.innerText);
    //console.log(event.lastHtml);
    //console.log(event.html);
    console.log(event);

    //setTextContent(event.target.textContent);
    //setTextContent(event.target.innerText);
    //setTextContent(event.currentTarget.textContent);
  }

  function typeFile(event){
    setFile(event.target.value);
  }

  function clickSaveText(){
    console.log(contentEditable.current.__html)
  }

  function clickSaveText(){
    contentEditable.current.innerText = "test\n test2";
    console.log(contentEditable.current.innerText)
  }


  return <>
    <div>
      <label>FileName:</label> <input /><button onClick={clickSaveText}> Save </button>
      <button onClick={clickSaveText}> Test </button>
    </div>
    <div
      ref={contentEditable}
      className={styles.textEditor}
      //onChange={typeTextContent}
      //onBlur={e => {console.log(e.currentTarget.textContent);}} 
      //suppressContentEditableWarning={true}
      dangerouslySetInnerHTML={{ __html: textContent }}
      //dangerouslySetInnerHTML={{ innerText: textContent }}
      onInput={typeTextContent}
      contentEditable={true}
      >
        
      </div>
  
  </>
}