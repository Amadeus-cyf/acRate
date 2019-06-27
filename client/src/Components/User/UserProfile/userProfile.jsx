import React, {Component} from 'react';
import {setUser, clearUser} from '../../../store/action.js';
import {connect} from 'react-redux';
import {Image, Label} from 'semantic-ui-react';
import AvatarSection from '../AvatarSection/avatarSection.jsx';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';
import ScoreBangumi from './ScoreBangumi/scoreBangumi.jsx';
import FollowingSection from './FollowingSection/followingSection.jsx';
import FollowerSection from './FollowerSection/followerSection.jsx';
import Subnavibar from '../Subnavibar/subnavibar.jsx';
import {imageStyle, textStyle} 
from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';

class UserProfile extends Component {
    render() {
        if (this.props.user === 'undefined') {
            let pageStyle = {
                display: 'block',
                margin: '0 auto',
                width: '100%',
                height: '100vh',
                paddingTop: '15%',
                background: 'white',
            }
            return (
                <div>
                    <Navibar/>
                    <Label style = {pageStyle}>
                        <div>
                            <Image className = {imageStyle} src={loadingGif} alt = 'loading'/>
                        </div>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </Label>
                </div>
            )
        }
        return (
            <div>
                <Navibar/>
                <AvatarSection/>
                <Subnavibar user = {this.props.user} current = 'home'/>
                <div style = {{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', 
                marginTop: '20px'}}>
                    <ScoreBangumi/>
                    <div style = {{width: '22%', marginLeft: '1%'}}>
                        <FollowingSection/>
                        <FollowerSection/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        user: state.user
    }
}

export default connect(mapStateToProps, {setUser, clearUser})(UserProfile);