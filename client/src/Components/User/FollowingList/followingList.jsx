import React, {Component} from 'react';
import axios from 'axios';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';
import {Label, Image, List, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import AvatarSection from '../AvatarSection/avatarSection.jsx';
import Subnavibar from '../Subnavibar/subnavibar.jsx';
import Following from './Following/following.jsx';
import {imageStyle, textStyle} from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';

class FollowingList extends Component {
    constructor() {
        super();
        this.state = {
            followingList: 'undefined',
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
        this.props.user.following.forEach((following_id) => {
            promises.push(axios.get('api/user/' + following_id))
        })
        let followinglist = [];
        if (promises.length === 0) {
            this.setState({
                followingList: [],
            })
            return;
        }
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
                    followinglist.push(user);
                } else {
                    let user = {
                        user_id: res.data.data.user._id,
                        username: res.data.data.user.username,
                        avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
                    }
                    followinglist.push(user);
                }
                this.setState({
                    followingList: followinglist,
                })
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.user === 'undefined' || this.state.followingList === 'undefined') {
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
                    <Subnavibar user = {this.props.user} current = 'following'/>
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
            margin: '10px auto',
            width: '75%',
            height: 'auto',
            background: 'white',
            textAlign: 'center',
            paddingTop: '100px',
            paddingBottom: '100px',
        }
        if (this.state.followingList.length === 0) {
            return (
                <div>       
                    <Navibar/>
                    <AvatarSection/>
                    <Subnavibar user = {this.props.user} current = 'following'/>
                    <Label style = {labelStyle}>
                        <h2 style = {{color: 'rgba(100, 100, 100, 0.6)'}}>No following</h2>
                    </Label>
                </div>
            )
        }
        let followinglist = this.state.followingList.map(user => {
            return (
                <Following following = {user}/>
            )
        })
        return (
            <div>
                <Navibar/>
                <AvatarSection/>
                <Subnavibar user = {this.props.user} current = 'following'/>
                <List style = {{width: '80%', height: 'auto', background: 'white', display: 'block',
                margin: '10px auto', paddingBottom: '5px'}}>
                    <h2 style = {{marginLeft: '2%', paddingTop: '2%'}}>Following</h2>
                    <Divider style = {{margin: '0 5% 0 5%'}}/>
                    {followinglist}
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

export default connect(mapStateToProps)(FollowingList);
