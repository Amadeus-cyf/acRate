import React, {Component} from 'react';
import MainMenu from '../MainMenu/mainMenu.jsx';
import RecentBangumi from './RecentBangumi/recentBangumi.jsx';
import {homeStyle, footer} from './homepage.module.scss';

class HomePage extends Component {
    constructor(){
        super();
        this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toUpcoming = this.toUpcoming.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.currentViewMore = this.currentViewMore.bind(this);
        this.pastViewMore = this.pastViewMore.bind(this);
        this.upcomingViewMore = this.upcomingViewMore.bind(this);
    }

    toHomePage() {
        this.props.history.push('/');
    }

    toBangumi() {
        this.props.history.push('/bangumi');
    }

    toUpcoming() {
        this.props.history.push('/upcomingbangumi');
    }

    loginHandler() {
        this.props.history.push('/login');
    }

    signupHandler() {
        this.props.history.push('/signup');
    }

    logoutHandler() {
        this.props.history.push('/logout');
    }

    currentViewMore() {
        this.props.history.push('/recentbangumi');
    }

    pastViewMore() {
        this.props.history.push('/pastbangumi');
    }

    upcomingViewMore() {
        this.props.history.push('/newbangumi');
    }

    render() {
        return(
            <div>
                <MainMenu 
                toHomePage = {this.toHomePage}
                loginHandler = {this.loginHandler}
                signupHandler = {this.signupHandler}
                logoutHandler = {this.logoutHandler}
                toBangumi = {this.toBangumi}
                toUpcoming = {this.toUpcoming}/>
                <div className = {homeStyle}>
                    <RecentBangumi 
                    currentViewMore = {this.currentViewMore} 
                    pastViewMore = {this.pastViewMore} 
                    upcomingViewMore = {this.upcomingViewMore}/>
                    <div className = {footer}>
                        <h2>Aniscore</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;