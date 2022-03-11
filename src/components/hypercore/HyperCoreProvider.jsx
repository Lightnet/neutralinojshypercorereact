/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useContext, useEffect, useMemo, useState} from "react";

export const hyperCoreContext = createContext();

export function useHyperCore(){
  const context = useContext(hyperCoreContext);
  if (!context) {
    throw new Error(`useHyperCore must be used within a hyperCoreContext`)
  }
  return context;
}

export function HyperCoreProvider(props){

  const [API_URL , setAPI_URL] = useState('http://localhost:3000');

  useEffect(()=>{

  },[])

  const value = useMemo(()=>({
    API_URL , setAPI_URL
  }),[
    API_URL
  ])

  return <hyperCoreContext.Provider value={value}  {...props}/>
}