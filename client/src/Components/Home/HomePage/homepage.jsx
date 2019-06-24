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

    render() {
        if (this.state.past) {
            return (
                <div>
                    <MainMenu current = 'home'/>
                    <div className = {bangumiSection}>
                        <CurrentBangumi/>
                        <PastBangumi className = {bangumiStyle}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className = {homeStyle}>
                    <MainMenu current = 'home'/>
                    <div className = {bangumiSection}>
                        <CurrentBangumi className = {bangumiStyle}/>
                        <UpcomingBangumi className = {bangumiStyle}/>
                    </div>
                </div>
            )
        }
    }
}

export default HomePage;