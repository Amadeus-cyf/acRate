import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import HomePage from '../HomePage/homepage.jsx';
import AllBangumi from '../AllBangumi/allBangumi.jsx';
import CurrentBangumi from '../CurrentBangumi/currentBangumi.jsx';
import PastBangumi from '../PastBangumi/pastBangumi.jsx';
import UpcomingBangumi from '../UpcomingBangumi/upcomingBangumi.jsx';
import Login from '../Login/login.jsx';
import  Signup from '../Signup/signup.jsx';
import Logout from '../Logout/logout.jsx';

class App extends Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route exact path = '/' component = {HomePage}/>
          <Route exact path = '/bangumi' component = {AllBangumi}/>
          <Route exact path = '/recentbangumi' component = {CurrentBangumi}/> 
          <Route exact path = '/pastbangumi' component = {PastBangumi}/> 
          <Route exact path = '/upcomingbangumi' component = {UpcomingBangumi}/> 
          <Route exact path = '/login' component = {Login}/>
          <Route exact path = '/signup' component = {Signup}/>
          <Route exact path = '/logout' component = {Logout}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
