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
        let season = 'winter';
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month >= 1 && month < 4) {
            season = 'winter';
        } else if (month >= 4 && month < 7) {
            season = 'spring';
        } else if (month >= 7 && month < 10) {
            season = 'summer';
        } else if (month >= 10) {
            season = 'fall';
        }
        this.props.history.push('/bangumi/' + year + '/' + season);
    }

    pastViewMore() {
        let date = new Date();
        let year = date.getFullYear();
        let pastSeason = 'winter';
        let month = date.getMonth() + 1;
        if (month >= 1 && month < 4) {
            year -= 1;
            pastSeason = 'fall';
        } else if (month >= 4 && month < 7) {
            pastSeason = 'winter';
        } else if (month >= 7 && month < 10) {
            pastSeason = 'spring';
        } else if (month >= 10) {
            pastSeason = 'summer';
        }
        this.props.history.push('/bangumi/' + year + '/' + pastSeason);
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