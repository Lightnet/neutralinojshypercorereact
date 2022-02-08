# neutralinojs hypercore react

# Created By: Lightnet

# Packges:
- @neutralinojs/neu
- express
- react
- @babel/core
- hyperdrive
- hyperspace
- hyperbee
- webpack
- browser-sync

# Information:
  Portable application for simple web hosting and file sharing. It only needs nodejs install to get those packages added and running.

  By using the htpp and hyper server address protocol. Just like torrent address. To set up simple UI for access files and web page. Idea design.

  https://hypercore-protocol.org/

  Hypercore Protocol is peer to peer data sharing. With the prefix of hyper"name" for hyperdrive, hyperspace, hyperbee and other modular packages.

  By using the react.js for UI design and fetch call url for data upload and download. Without need to refresh the page or reload them since those components is modular format. Work in progress.

  One is React.js is bundle single file for client browser. It save bandwidth in some degree.

  As for the stream data that have not try yet.

# Features:
- Auth check access. (Not build / Testing...)

- Hyperdrive (file management)
  - local (default without the key for general access, configs and save drive keys)
    - create file (added)
    - upload (not added)
    - delete file (added)
    - create folder (added)
    - delete folder (added)

  - create drive key (not added)
  - list drive key (not added)
- Hyperbee (database) (not added)
  - key  (not added)
  - sub key (not added)

- express
  - api for drive access, upload, download and other functions calls.

# Set Up:

```
npm install
npm i -g @neutralinojs/neu

neu update

npm run dev
```


# Dev:
```
"nativeAllowList": [
    "app.*",
    "os.*",
    "window.*",
    "storage.*",
    "filesystem.*",
    "extensions.*",
    "clipboard.*",
    "computer.*",
    "debug.*",// for dev error on promise remove when added.
    "events.*"
  ],
```

# Links:
- https://hypercore-protocol.org/
- https://neutralino.js.org/


- https://hypercore-protocol.org/guides/examples/hyperdrive-app/
- https://github.com/neutralinojs/neutralinojs

