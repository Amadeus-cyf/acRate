import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import {navibarStyle} from './subnavibar.module.scss';

class Subnavibar extends Component {
    constructor() {
        super();
        this.toHome = this.toHome.bind(this);
        this.toScore = this.toScore.bind(this);
    }

    toHome() {
        if (this.props.user._id) {
            this.props.history.push('/user/userProfile/' + this.props.user._id);
        }
    }

    toScore() {
        if (this.props.user._id) {
            this.props.history.push('/user/scoreBangumi/' +  this.props.user._id);
        }
    }

    render() {
        let fontStyle = {
            fontSize: '10pt',
        }
        return(
            <div className = {navibarStyle}>
                <Menu pointing secondary style = {{display: 'block', margin: '0 auto'}}>
                    <Menu.Item style = {fontStyle}
                        name='Home'
                        active={this.props.current === 'home'}
                        onClick = {this.toHome}
                    />
                    <Menu.Item style = {fontStyle}
                        name='Scored Bangumi'
                        active = {this.props.current === 'bangumi'}
                        onClick = {this.toScore}
                    />
                </Menu>
            </div>
        )
    }
}

export default withRouter(Subnavibar);