import React, {Component} from 'react';
import {navibarStyle, title} from './subnavibar.module.scss';

class Subnavibar extends Component {
    constructor() {
        super();
        this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toUpcoming = this.toUpcoming.bind(this);
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

    render() {
        return(
            <div className = {navibarStyle}>
                <div className={title} onClick = {this.toHomePage}>Home Page</div>
                <div className={title} onClick = {this.toBangumi}>Bangumi</div>
                <div className={title} onClick = {this.toUpcoming}>Upcoming</div>
            </div>
        )
    }
}

export default Subnavibar;