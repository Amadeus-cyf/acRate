import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser, clearUser} from '../../../../store/action.js';
import {Label, Image, Button} from 'semantic-ui-react';

class FollowerSection extends Component {
    constructor() {
        super();
        this.state = {
            follower: 'undefined',
        }
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
        if (this.props.user.follower.length) {
            let followers = [];
            for (let i = 0; i < Math.min(this.props.user.follower.length, 3); i++) {
                followers.push(axios.get('api/user/' + this.props.user.follower[i]));
            }
            let followerlist = [];
            axios.all(followers)
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
                    follower: followerlist,
                })
            })
        } else {
            this.setState({
                follower: [],
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

    render() {
        let labelStyle = {
            width: '100%',
            height: '250px',
            marginTop: '20px',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
        if (this.state.follower === 'undefined') {
            return (
                <Label style = {labelStyle}>
                    <h2 style = {{color: 'rgba(100, 100, 100, 0.6)'}}>Loading...</h2>
                </Label>
            )
        }
        if(this.state.follower.length === 0) {
            return (
                <Label style = {labelStyle}>
                    <h2 style = {{color: 'rgba(100, 100, 100, 0.6)'}}>No follower</h2>
                </Label>
            )
        }
        let followStyle = {
            background: 'white',
            margin: '5px 20px 5px 20px',
        }
        let followerList = this.state.follower.map(user => {
            return(
                <Label style = {followStyle}>       
                    <Image onClick = {this.toProfile.bind(this, user)}
                    style = {{transform: 'scale(2)', marginRight: '10px'}} 
                    avatar src = {user.avatar}></Image>
                    <h3> {user.username} </h3>
                </Label>
            )
        })
        let viewMoreStyle = {
            position: 'absolute',
            right: '2%',
            bottom: '20px',
        }
        return (
            <Label style = {{background: 'white',  position: 'relative', width: '100%',
            height: '200px', marginTop: '20px'}}>
                <h3 style = {{padding: '15px'}}>
                    Follower
                    <Button style = {viewMoreStyle} color = 'blue' size = 'tiny'>View more</Button>
                </h3>
                <div style = {{marginLeft: '20px', marginRight: '20px'}}>
                    {followerList}
                </div>
            </Label>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, {setUser, clearUser})(withRouter(FollowerSection));