/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

import React, { useEffect, useState } from "react";
import useFetch from "../hook/useFetch.mjs";

export default function HyperBeeContent(){

  const [hyperbeeID, setHyperbeeID] = useState('');
  const [beeKey, setBeeKey] = useState('');
  const [beeValue, setBeeValue] = useState('');
  const [beeDB, setBeeDB] = useState([]);
  const [viewType, setViewType] = useState('db');

  useEffect(()=>{
    getBeeDB();
  },[]);

  async function getBeeDB(){
    //if(dirname=='/'){
      let data = await useFetch('http://localhost/bee');
      console.log(data);
      if(data.error){
        console.log('Fetch Error get dir list.')
        return;
      }
      if(data.list){
        setBeeDB(data.list);
        setViewType('db');
      }
    //}else{
      //DriveDirList(dirname)
    //}
  }

  function typeHyperbeeID(event){
    setHyperbeeID(event.target.value);
  }

  function clickCreateHyperbee(){

  }

  async function clickGetHyperbee(){
    let data = await useFetch('http://localhost/bee',{
      method:'POST',
      body:JSON.stringify({api:'key'})
    });
      console.log(data);
      if(data.error){
        console.log('Fetch Error get dir list.')
        return;
      }
      if(data.api=='key'){
        console.log(data.api)
        console.log(data.key)
        setHyperbeeID(data.key);
      }
  }

  function viewRender(){
    if(viewType=='db'){
      return(
        beeDB.map((item)=>{
          return (<div key={item.key}>
            <label> Key:{item.key} </label>
            <label> Value:{item.value} </label>
          </div>)
        })
      )
    }
    return <></>
  }

  return <>
    <div>
      <label> HyperBee Key: </label> 
      <button onClick={clickCreateHyperbee}> Create </button>
      <button onClick={clickGetHyperbee}> Get </button>
      <input value={hyperbeeID} onChange={typeHyperbeeID} size="60"></input>
    </div>
    <div>
      {viewRender()}
    </div>
  </>
}