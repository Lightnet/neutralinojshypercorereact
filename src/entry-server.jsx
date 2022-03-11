/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React from "react";
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { App } from './App'
import { HyperCoreProvider } from "./components/hypercore/HyperCoreProvider";
import { ThemeProvider } from './components/theme/ThemeProvider'

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <HyperCoreProvider>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </HyperCoreProvider>
    </StaticRouter>
  )
}