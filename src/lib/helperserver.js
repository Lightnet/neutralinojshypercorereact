/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

const { customAlphabet } = require('nanoid');
const dayjs = require( "dayjs");

//random character name test
exports.makeId = function makeId(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//check for empty string
exports.isEmpty = function isEmpty(str) {
  return (!str || str.length === 0 || !str.trim());
}

// https://zelark.github.io/nano-id-cc/

exports.nanoid16 = function nanoid16(){
  //~4 million years needed, in order to have a 1% probability of at least one collision.
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 16)();
}

exports.nanoid32= function nanoid32(){
  // ~107 billion years needed, in order to have a 1% probability of at least one collision.
  //nanoid() //=> "zTzQvWe5X0irVfJeQJ6GzS6DhGBux79c"
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 32)();
}

exports.unixTime= function unixTime(){
  return dayjs().unix();
}

exports.unixToDate= function unixToDate(unix){
  return dayjs.unix(unix).format('DD/MM/YYYY h:m:s a');
}