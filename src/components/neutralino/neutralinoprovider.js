/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://neutralino.js.org/docs/api/window/

import React,{ createContext, useEffect, useMemo, useState} from "react";

export const neutralinoContext = createContext();

export function useNeutralino(){
  const context = useContext(neutralinoContext);
  if (!context) {
    throw new Error(`useNeutralino must be used within a neutralinoContext`)
  }
  return context;
}

export function NeutralinoProvider(props){

  const [isApp, setIsApp] = useState(false);

  //check neutralino api 
  useEffect(()=>{

  },[])

  const value = useMemo(()=>({
    isApp, setIsApp
  }),[
    isApp
  ])

  return <neutralinoContext.Provider value={value}  {...props}/>
}