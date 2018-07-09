import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory, Redirect} from 'react-router'
import {BrowserRouter, Switch} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Rooms from './components/Rooms';



const styles = {
  title: {
    cursor: 'pointer',
  },
};


const App = ( {children} ) => (
  <Switch>
     <Route
      exact
      path='/'
      render={() => {
      return(
        <Rooms />
      )
      }}
    />
  </Switch>
)

export default App
