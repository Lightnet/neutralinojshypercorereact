/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

import { customAlphabet } from 'nanoid';
import dayjs from "dayjs";

//random character name test
export function makeId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//check for empty string
export function isEmpty(str) {
  return (!str || str.length === 0 || !str.trim());
}

// https://zelark.github.io/nano-id-cc/

export function nanoid16(){
  //~4 million years needed, in order to have a 1% probability of at least one collision.
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 16)();
}

export function nanoid32(){
  // ~107 billion years needed, in order to have a 1% probability of at least one collision.
  //nanoid() //=> "zTzQvWe5X0irVfJeQJ6GzS6DhGBux79c"
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 32)();
}

export function unixTime(){
  return dayjs().unix();
}

export function unixToDate(unix){
  return dayjs.unix(unix).format('DD/MM/YYYY h:m:s a');
}

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export function capitalizeFirstLetter(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}