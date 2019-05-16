import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../MainPage/mainpage.jsx';
import Login from '../Login/login.jsx';

class App extends Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route exact path = '/' component = {MainPage}/>
          <Route exact path = '/login' component = {Login}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
