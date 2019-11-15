import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser, clearUser} from '../../../../store/action.js';
import {Label, Image, Button} from 'semantic-ui-react';
import {hoverPart, avatarStyle} from './followingSection.module.scss';

class FollowingSection extends Component {
    constructor() {
        super();
        this.state = {
            following: 'undefined',
        }
        this.viewMore = this.viewMore.bind(this);
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        if (this.props.user === 'undefined') {
            return;
        }
        if (this.props.user.following.length) {
            let followings = [];
            for (let i = 0; i < Math.min(this.props.user.following.length, 3); i++) {
                followings.push(axios.get('api/user/' + this.props.user.following[i]));
            }
            let followinglist = [];
            axios.all(followings)
            .then(response => {
                response.forEach(res => {
                    if (res.data.data.user.avatar) {
                        let user = {
                            user_id: res.data.data.user._id,
                            username: res.data.data.user.username,
                            avatar: res.data.data.user.avatar,
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
                })
                this.setState({
                    following: followinglist,
                })
            })
        } else {
            this.setState({
                following: [],
            })
        }
    }

    toProfile(user) {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        this.props.setUser(user.user_id);
        this.props.history.push('/user/userProfile/' + user.user_id)
    }
    
    viewMore() {
        this.props.history.push('/user/following/' + this.props.user._id);
    }

    render() {
        let labelStyle = {
            width: '100%',
            height: '250px',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
        if (this.state.following === 'undefined') {
            return (
                <Label style = {labelStyle}>
                    <h2 style = {{color: 'rgba(100, 100, 100, 0.6)'}}>Loading...</h2>
                </Label>
            )
        }
        if(this.state.following.length === 0) {
            return (
                <Label style = {labelStyle}>
                    <h2 style = {{color: 'rgba(100, 100, 100, 0.6)'}}>No following</h2>
                </Label>
            )
        }
        let followStyle = {
            background: 'white',
            marginTop: '10px',
            textAlign: 'center',
        }
        let followingList = this.state.following.map(user => {
            return(
                <Label style = {followStyle}>       
                    <Image className = {hoverPart} onClick = {this.toProfile.bind(this, user)}
                    style = {{transform: 'scale(2)', marginRight: '10px'}} 
                    avatar src = {user.avatar}></Image>
                    <h3> {user.username} </h3>
                </Label>
            )
        })
        let viewMoreStyle = {
            position: 'absolute',
            right: '5px',
            bottom: '5px',
        }
        return (
            <Label style = {{background: 'white', position: 'relative', height: 'auto', width: '100%'}}>
                <h3 style = {{margin: '10px'}}>
                    Following
                </h3>
                <div className = {avatarStyle}>
                    {followingList}
                </div>
                <Button onClick = {this.viewMore} style = {viewMoreStyle} 
                color = 'blue' size = 'tiny'>View more</Button>
            </Label>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, {setUser, clearUser})(withRouter(FollowingSection));