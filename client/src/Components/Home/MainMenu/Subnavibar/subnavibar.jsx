import React, {Component} from 'react';
import {navibarStyle, title} from './subnavibar.module.scss';

class Subnavibar extends Component {
    constructor() {
        super();
        this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toSeason = this.toSeason.bind(this);
        this.toUpcoming = this.toUpcoming.bind(this);
    }

    toHomePage() {
        this.props.history.push('/');
    }

    toBangumi() {
        this.props.history.push('/bangumi')
    }

    toSeason() {
        this.props.history.push('/bangumi/season');
    }

    toUpcoming() {
        this.props.history.push('/upcomingbangumi');
    }

    render() {
        return(
            <div className = {navibarStyle}>
                <div className={title} onClick = {this.toHomePage}>Home Page</div>
                <div className={title} onClick = {this.toBangumi}>Bangumi</div>
                <div className={title} onClick = {this.toSeason}>Season</div>
                <div className={title} onClick = {this.toUpcoming}>Upcoming</div>
            </div>
        )
    }
}

export default Subnavibar;