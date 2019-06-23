import React, {Component} from 'react';
import {Label, Button, Image} from 'semantic-ui-react';
import axios from 'axios';

class FollowList extends Component {
    constructor() {
        super();
        this.state = {
            following: [],
            //followers: [],
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

    render() {
        let labelStyle = {
            width: '28%',
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
                    <Image style = {{transform: 'scale(1.5)', marginRight: '10px'}} avatar src = {user.avatar}></Image>
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

export default FollowList;