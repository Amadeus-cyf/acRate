import React, {Component} from 'react';
import {navibarStyle} from './subnavibar.module.scss';

class Subnavibar extends Component {
    render() {
        return(
            <div className = {navibarStyle}>
                <div onClick = {this.props.toHomePage}>Home Page</div>
                <div onClick = {this.props.toBangumi}>Bangumi</div>
                <div onClick = {this.props.toManga}>Manga</div>
            </div>
        )
    }
}

export default Subnavibar;