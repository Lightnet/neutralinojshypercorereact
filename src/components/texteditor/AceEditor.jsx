/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/securingsincity/react-ace/issues/162
// https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
import React, { useEffect, useState } from "react";

export default function AceEditor(props,ref){

  const [Ace, SetAce] = useState(null);

  useEffect( async()=>{
    if (typeof window !== 'undefined') {//server ssr
      const ReactAce = await import("react-ace");
      await import("ace-builds/src-noconflict/mode-javascript");
      await import("ace-builds/src-noconflict/mode-jsx");
      await import("ace-builds/src-noconflict/mode-json.js");
      await import("ace-builds/src-noconflict/mode-html");
      await import("ace-builds/src-noconflict/mode-css");
      //await import("ace-builds/src-noconflict/theme-github");
      await import("ace-builds/src-noconflict/theme-terminal");
      await import("ace-builds/src-noconflict/theme-twilight");
      SetAce(ReactAce)
    }
  },[])

  if(Ace){
    //console.log(Ace)
    const AceComp = Ace.default;
    return <AceComp ref={ref} {...props}/>
  }
  return null;
}

export const AceEditorRef = React.forwardRef(AceEditor);