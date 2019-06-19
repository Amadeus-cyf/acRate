import React, {Component} from 'react';
import axios from 'axios';
import {Image} from 'semantic-ui-react';
import AvatarSection from '../AvatarSection/avatarSection.jsx';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';
import {pageContainer, imageStyle, textStyle} 
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
        axios.get('api/user/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                user: response.data.data.user,
            })
        }).catch(err => {
            alert(err);
        })
        axios.get('/api/auth/currentUser')
        .then(response => {
            this.setState({
                currentUser: response.data.data,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.user === 'undefined') {
            return (
                <div>
                    <Navibar history = {this.props.history}/>
                    <div className = {pageContainer}>
                        <div>
                            <Image className = {imageStyle} src={loadingGif} alt = 'loading'/>
                        </div>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Navibar history = {this.props.history}/>
                <AvatarSection user = {this.state.user} currentUser = {this.state.currentUser}
                history = {this.props.history}/>
            </div>
        )
    }
}

export default UserProifle;