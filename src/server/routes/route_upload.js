

// https://www.pluralsight.com/guides/uploading-files-with-reactjs
// https://expressjs.com/en/resources/middleware/multer.html
var express = require('express')
var router = express.Router()
const multer  = require('multer')
const upload = multer()

// define the about route
router.post('/upload', upload.single('File'),async function (req, res) {
  
  //const drive = await getHyperDrive();
  //const list = await drive.promises.readdir('/');
  //res.send(JSON.stringify({dir:'/',list:list}));
  console.log('test////')
  console.log(req.body);
  console.log(req.file);
  console.log(req.files);

  res.send(JSON.stringify({dir:'/'}));
})

module.exports = router;