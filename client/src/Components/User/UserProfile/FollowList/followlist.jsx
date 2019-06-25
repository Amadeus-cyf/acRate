import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setUser, clearUser} from '../../../../store/action.js';
import {Label, Image} from 'semantic-ui-react';

class FollowList extends Component {
    constructor() {
        super();
        this.state = {
            following: [],
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
        if (this.props.user.following.length) {
            let followings = [];
            for (let i = 0; i < this.props.user.following.length; i++) {
                followings.push(axios.get('api/user/' + this.props.user.following[i]));
            }
            let followinglist = [];
            axios.all(followings)
            .then(response => {
                response.forEach(res => {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let avatarStr = this.arrayBufferToBase64(res.data.data.user.avatar.data.data);
                    let user = {
                        user_id: res.data.data.user._id,
                        username: res.data.data.user.username,
                        avatar: base64Flag + avatarStr,
                    }
                    followinglist.push(user);
                })
                this.setState({
                    following: followinglist,
                })
            })
        }
    }

    toProfile(user) {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        this.props.history.push('/user/userProfile/' + user.user_id)
    }

    render() {
        let labelStyle = {
            width: '25%',
            height: '200px',
            marginLeft: '2%',
            background: 'white',
        }
        if(this.state.following.length === 0) {
            return <Label style = {labelStyle}>
                    loading...
            </Label>
        }
        let followingList = this.state.following.map(user => {
            return(
                <Label style = {{background: 'white'}}>       
                    <Image onClick = {this.toProfile.bind(this, user)}
                    style = {{transform: 'scale(1.5)', marginRight: '10px'}} 
                    avatar src = {user.avatar}></Image>
                    {user.username}
                </Label>
            )
        })
        return (
            <Label style = {labelStyle}>
                <h4>Following</h4>
                {followingList}
            </Label>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, {clearUser})(withRouter(FollowList));