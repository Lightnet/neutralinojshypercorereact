/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

import React, { useEffect, useState } from "react";
import useAxiosTokenAPI from "../hook/useAxiosTokenAPI.jsx";
import useFetch from "../hook/useFetch.mjs";

export default function HyperBeeContent(){

  const [hyperbeeID, setHyperbeeID] = useState('');
  const [beeKey, setBeeKey] = useState('');
  const [beeValue, setBeeValue] = useState('');
  const [beeDB, setBeeDB] = useState([]);
  const [viewType, setViewType] = useState('db');

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    console.log("axiosJWT init...");
    console.log("isLoading: ", isLoading)
    if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
      console.log("GETTING...: ")
      getBeeDB();
    }
  },[axiosJWT,isLoading])

  //useEffect(()=>{
    //getBeeDB();
  //},[]);

  async function getBeeDB(){
    axiosJWT.instance.get("/api/hyperbee")
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
            setBeeDB(data.list);
            setViewType('db');
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  function typeHyperbeeID(event){
    setHyperbeeID(event.target.value);
  }

  function clickCreateHyperbee(){

  }

  async function clickGetHyperbee(){
    axiosJWT.instance.post('/api/hyperbee',{
      api:'key'
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
        if(data.api=='key'){
          console.log(data.api)
          console.log(data.key)
          setHyperbeeID(data.key);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

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