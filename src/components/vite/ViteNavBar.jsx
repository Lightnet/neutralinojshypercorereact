/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React, { useEffect, useState } from "react";
import { 
  Link
//, useNavigate
} from "react-router-dom";

export default function ViteNavBar(){

  //const navigate = useNavigate();
  const [navnames, setNavNames] = useState([]);

  useEffect(()=>{
    setNavNames([
      {name: "Home", path:"/"}
      ,{name: "HyperDrive", path:"/hyperdrive"}
      ,{name: "HyperDrive Tree", path:"/hyperdrivetree"}
      ,{name: "HyperBee", path:"/hyperbee"}
      ,{name: "Text Editor", path:"/texteditor"}
    ])
  },[])

  return <div>
    {navnames.map(({ name, path }) => {
        //console.log(path)
        //console.log(name)
        return (<span key={path}> <Link to={path}> {name} </Link> | </span>)
      })}
  </div>
}