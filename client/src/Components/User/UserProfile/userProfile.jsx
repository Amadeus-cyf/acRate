import React, {Component} from 'react';
import {setUser, clearUser} from '../../../store/action.js';
import {connect} from 'react-redux';
import {Image, Label} from 'semantic-ui-react';
import AvatarSection from '../AvatarSection/avatarSection.jsx';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';
import ScoreBangumi from './ScoreBangumi/scoreBangumi.jsx';
import FollowList from './FollowList/followlist.jsx';
import Subnavibar from '../Subnavibar/subnavibar.jsx';
import {imageStyle, textStyle} 
from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';

class UserProfile extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.setUser(this.props.match.params.user_id);
    }

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
        let follow = 'follow'
        if (this.props.currentUser.following.includes(this.props.user._id)) {
            follow = 'following';
        }
        return (
            <div>
                <Navibar/>
                <AvatarSection user = {this.props.user} currentUser = {this.props.currentUser}
                isFollow = {follow}/>
                <Subnavibar user = {this.props.user} current = 'home'/>
                <div style = {{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <ScoreBangumi/>
                    <FollowList/>
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