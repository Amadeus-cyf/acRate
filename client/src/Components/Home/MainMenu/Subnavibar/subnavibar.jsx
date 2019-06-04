import React, {Component} from 'react';
import {navibarStyle, title} from './subnavibar.module.scss';

class Subnavibar extends Component {
    render() {
        return(
            <div className = {navibarStyle}>
                <div className={title} onClick = {this.props.toHomePage}>Home Page</div>
                <div className={title} onClick = {this.props.toBangumi}>Bangumi</div>
                <div className={title} onClick = {this.props.toUpcoming}>Upcoming</div>
            </div>
        )
    }
}

export default Subnavibar;