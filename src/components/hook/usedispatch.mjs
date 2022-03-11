/*
  LICENSE: MIT
  Created by: Lightnet

  very simple useDispatch using the doc or window to listen to handle name

*/

//import { useEffect, useRef } from "react";

export default function useDispatch(event,data) {
  //const customEvent = new CustomEvent('build', {
    //detail: {
       //name: 'primary'
    //}
  //});
  //useEffect(() => {
  //});
  //document.dispatchEvent(customEvent);
  //const customEvent = new CustomEvent(event,data);
  let customEvent = new CustomEvent(event,data);
  window.dispatchEvent(customEvent);
}