import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import HomePage from '../Home/HomePage/homepage.jsx';
import SeasonBangumi from '../Home/SeasonBangumi/seasonBangumi.jsx';
import AllBangumi from '../Home/AllBangumi/allBangumi.jsx';
import UpcomingBangumi from '../Home/UpcomingBangumi/upcomingBangumi.jsx';
import RecentBangumi from '../RecentBangumi/recentBangumi.jsx';
import NewBangumi from '../NewBangumi/newBangumi.jsx';
import SearchResult from '../SearchResult/searchResult.jsx';
import DetailPage from '../DetailPage/detailPage.jsx';
import Login from '../Login/login.jsx';
import Signup from '../Signup/signup.jsx';
import Logout from '../Logout/logout.jsx';

class App extends Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route exact path = '/' component = {HomePage}/>
          <Route exact path = '/bangumi' component = {AllBangumi}/>
          <Route exact path = '/bangumi/season' component = {SeasonBangumi}/>
          <Route exact path = '/bangumi/:year/:season' component = {RecentBangumi}/> 
          <Route exact path = '/newbangumi' component = {NewBangumi}/>
          <Route exact path = '/upcomingbangumi' component = {UpcomingBangumi}/> 
          <Route exact path = '/search/:keyword' component = {SearchResult}/>
          <Route exact path = '/detail/:anime_id' component = {DetailPage}/>
          <Route exact path = '/login' component = {Login}/>
          <Route exact path = '/signup' component = {Signup}/>
          <Route exact path = '/logout' component = {Logout}/>
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
