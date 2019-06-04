import React, {Component} from 'react';
import MainMenu from '../MainMenu/mainMenu.jsx';
import {bangumiSection, bangumiStyle, homeStyle} from './homepage.module.scss';
import PastBangumi from './PastBangumi/pastBangumi.jsx';
import CurrentBangumi from './CurrentBangumi/currentBangumi.jsx';
import UpcomingBangumi from './UpcomingBangumi/upcomingBangumi.jsx';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            upcoming: false,
            past: false,
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toUpcoming = this.toUpcoming.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }
    
    componentDidMount() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month >= 1 && month < 4) {
            if (month <= 3 || day <= 24) {
                this.setState({
                    past: true,
                })
            } else {
                this.setState({
                    upcoming: true,
                })
            }
        } else if (month >= 4 && month < 7) {
            if (month <= 6 || day <= 24) {
                this.setState({
                    past: true,
                })
            } else {
                this.setState({
                    upcoming: true,
                })
            }
        } else if (month >= 7 && month < 10) {
            if (month <= 9 || day <= 24) {
                this.setState({
                    past: true,
                })
            } else {
                this.setState({
                    upcoming: true,
                })
            }
        } else if (month >=10) {
            if (month <= 12 || day <= 24) {
                this.setState({
                    past: true,
                })
            } else {
                this.setState({
                    upcoming: true,
                })
            }
        }
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

    render() {
        if (this.state.past) {
            return (
                <div>
                    <MainMenu 
                    toHomePage = {this.toHomePage}
                    loginHandler = {this.loginHandler}
                    signupHandler = {this.signupHandler}
                    logoutHandler = {this.logoutHandler}
                    toBangumi = {this.toBangumi}
                    toUpcoming = {this.toUpcoming}
                    history = {this.props.history}
                    />
                    <div className = {bangumiSection}>
                        <CurrentBangumi history = {this.props.history}/>
                        <PastBangumi className = {bangumiStyle} history = {this.props.history}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className = {homeStyle}>
                    <MainMenu
                    toHomePage = {this.toHomePage}
                    loginHandler = {this.loginHandler}
                    signupHandler = {this.signupHandler}
                    logoutHandler = {this.logoutHandler}
                    toBangumi = {this.toBangumi}
                    toUpcoming = {this.toUpcoming}
                    history = {this.props.history}/>
                    <div className = {bangumiSection}>
                        <CurrentBangumi className = {bangumiStyle} history = {this.props.history}/>
                        <UpcomingBangumi className = {bangumiStyle} history = {this.props.history}/>
                    </div>
                </div>
            )
        }
    }
}

export default HomePage;