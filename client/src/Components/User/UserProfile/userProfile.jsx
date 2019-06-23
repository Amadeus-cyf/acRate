import React, {Component} from 'react';
import axios from 'axios';
import {Image, Label} from 'semantic-ui-react';
import AvatarSection from '../AvatarSection/avatarSection.jsx';
import Navibar from '../Navibar/navibar.jsx';
import ScoreBangumi from './ScoreBangumi/scoreBangumi.jsx';
import FollowList from './FollowList/followlist.jsx';
import Subnavibar from '../Subnavibar/subnavibar.jsx';
import {imageStyle, textStyle} 
from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';

class UserProifle extends Component {
    constructor() {
        super();
        this.state = {
            user: 'undefined',
            currentUser: 'undefined',
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
        axios.get('/api/auth/currentUser')
        .then(response => {
            if (response.data.message === 'success') {
                this.setState({
                    currentUser: response.data.data,
                })
            } else {
                this.setState({
                    currentUser: undefined,
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.user === 'undefined' || this.state.currentUser === 'undefined') {
            let pageStyle = {
                display: 'block',
                margin: '10px auto',
                width: '85%',
                background: 'white',
            }
            return (
                <div>
                    <Navibar history = {this.props.history} currentUser = {this.state.currentUser}/>
                    <AvatarSection user = {this.state.user} currentUser = {this.state.currentUser}
                    history = {this.props.history}/>
                    <Subnavibar user = {this.state.user} history = {this.props.history} 
                    current = 'home'/>
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
                <Navibar history = {this.props.history} currentUser = {this.state.currentUser}/>
                <AvatarSection user = {this.state.user} currentUser = {this.state.currentUser}
                history = {this.props.history}/>
                <Subnavibar user = {this.state.user} history = {this.props.history} current = 'home'/>
                <div style = {{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <ScoreBangumi history = {this.props.history} user = {this.state.user}/>
                    <FollowList user = {this.state.user}/>
                </div>
            </div>
        )
    }
}

export default UserProifle;