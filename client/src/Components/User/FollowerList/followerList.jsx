import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, List, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';
import AvatarSection from '../AvatarSection/avatarSection.jsx';
import Subnavibar from '../Subnavibar/subnavibar.jsx';
import Follower from './Follower/follower.jsx';
import {imageStyle, textStyle} from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';

class FollowerList extends Component {
    constructor() {
        super();
        this.state = {
            followerList: 'undefined',
        }
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        let promises = [];
        this.props.user.follower.forEach(follower_id => {
            promises.push(axios.get('api/user/' + follower_id));
        })
        if (promises.length === 0) {
            this.setState({
                followerList: [],
            })
            return;
        }
        let followerlist = []
        axios.all(promises)
        .then(response => {
            response.forEach(res => {
                if (res.data.data.user.avatar) {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let avatarStr = this.arrayBufferToBase64(res.data.data.user.avatar.data.data);
                    let user = {
                        user_id: res.data.data.user._id,
                        username: res.data.data.user.username,
                        avatar: base64Flag + avatarStr,
                    }
                    followerlist.push(user);
                } else {
                    let user = {
                        user_id: res.data.data.user._id,
                        username: res.data.data.user.username,
                        avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
                    }
                    followerlist.push(user);
                }
            })
            this.setState({
                followerList: followerlist,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.props.user === 'undefined' || this.state.followerList === 'undefined') {
            let pageStyle = {
                display: 'block',
                margin: '10px auto',
                width: '80%',
                background: 'white',
            }
            return (
                <div>
                    <Navibar/>
                    <AvatarSection/>
                    <Subnavibar user = {this.props.user} current = 'follower'/>
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
        let labelStyle = {
            display: 'block',
            margin: '20px auto',
            width: '80%',
            height: 'auto',
            background: 'white',
            textAlign: 'center',
            paddingTop: '100px',
            paddingBottom: '100px',
        }
        if (this.state.followerList.length === 0) {
            return (
                <div>       
                    <Navibar/>
                    <AvatarSection/>
                    <Subnavibar user = {this.props.user} current = 'follower'/>
                    <Label style = {labelStyle}>
                        <h2 style = {{color: 'rgba(100, 100, 100, 0.6)'}}>No follower</h2>
                    </Label>
                </div>
            )
        }
        let followerlist = this.state.followerList.map(user => {
            return (
                <Follower follower = {user}/>
            )
        })
        return (
            <div>
                <Navibar/>
                <AvatarSection/>
                <Subnavibar user = {this.props.user} current = 'follower'/>
                <List style = {{width: '80%', height: 'auto', background: 'white', display: 'block',
                margin: '20px auto', paddingBottom: '5px'}}>
                    <h2 style = {{marginLeft: '2%', paddingTop: '2%'}}>Follower</h2>
                    <Divider style = {{margin: '0 5% 0 5%'}}/>
                    {followerlist}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        user: state.user,
    }
}

export default connect(mapStateToProps)(FollowerList);