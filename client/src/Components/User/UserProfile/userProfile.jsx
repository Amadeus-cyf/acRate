import React, {Component} from 'react';
import axios from 'axios';
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
        this.state = {
            user: 'undefined',
        }
    }

    componentDidMount() {
        axios.get('api/user/' + this.props.match.params.user_id)
        .then(response => {
            this.setState({
                user: response.data.data.user,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.user === 'undefined') {
            let pageStyle = {
                display: 'block',
                margin: '10px auto',
                width: '85%',
                background: 'white',
            }
            return (
                <div>
                    <Navibar history = {this.props.history}/>
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
        if (this.props.currentUser.following.includes(this.state.user._id)) {
            follow = 'following';
        }
        return (
            <div>
                <Navibar/>
                <AvatarSection user = {this.state.user} currentUser = {this.props.currentUser}
                history = {this.props.history} isFollow = {follow}/>
                <Subnavibar user = {this.state.user} history = {this.props.history} current = 'home'/>
                <div style = {{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <ScoreBangumi history = {this.props.history} user = {this.state.user}/>
                    <FollowList user = {this.state.user}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(UserProfile);