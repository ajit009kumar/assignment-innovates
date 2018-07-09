import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import AppBar from 'material-ui/AppBar'
import Routes from './Routes'

// import { BrowserRouter as Router } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
import thunk from 'redux-thunk'

injectTapEventPlugin()
const middleware = applyMiddleware(thunk, logger)
const store = createStore(middleware)

render(
  <Router history={history}>
    <Provider store={store}>
      <MuiThemeProvider>
        <Routes />
      </MuiThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('app')
)
