
```js
// https://www.codegrepper.com/code-examples/javascript/download+file+from+url+in+react
  // https://javascript.plainenglish.io/downloading-files-in-react-native-with-rnfetchblob-f78b18b46a36
  async function clickDownloadTest(){
    let fileURL = 'test.txt';
    fetch('http://localhost/download/' + fileURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        fileURL,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
  }
```

https://openbase.com/categories/js/best-nodejs-bittorrent-libraries