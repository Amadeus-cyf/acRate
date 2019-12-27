import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, setUser, clearUser} from '../../../../store/action.js';
import {Image, Button, List, Divider} from 'semantic-ui-react';
import {hoverPart} from './follower.module.scss';

class Follower extends Component {
    constructor() {
        super();
        this.state = {
            isFollow: false,
        }
        this.toProfile = this.toProfile.bind(this);
        this.followHandler = this.followHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.user.following.includes(this.props.follower.user_id)) {
            this.setState({
                isFollow: true,
            })
        }
    }

    toProfile() {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        this.props.setUser(this.props.follower.user_id);
        this.props.history.push('/user/userProfile/' + this.props.follower.user_id)
    }

    followHandler() {
        // unfollow the user
        if (this.state.isFollow) {
            this.setState({
                isFollow: false,
            })
            axios('api/user/unfollow/' + this.props.currentUser._id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    unfollow_id: this.props.follower.user_id,
                }
            }).then(() => {
                this.props.setUser(this.props.currentUser._id);
            }).catch(err => {
                alert(err);
            })
        } else {
            // follow the follower
            this.setState({
                isFollow: true,
            })
            axios('api/user/follow/' + this.props.currentUser._id, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    following_id: this.props.follower.user_id,
                }
            }).then(() => {
                this.props.setUser(this.props.currentUser._id);
            }).catch(err => {
                alert(err);
            })
        }
    }

    render() {
        if (this.props.currentUser._id !== this.props.user._id) {
            return (
                <List.Item style = {{position: 'relative'}}> 
                    <Image className = {hoverPart} onClick = {this.toProfile}
                    style = {{transform: 'scale(2)', margin: '40px 3% 40px 8%'}} 
                    avatar src = {this.props.follower.avatar}/>
                    <List.Content style = {{fontSize: '11.5.5pt'}}> 
                        <List.Header>    
                            {this.props.follower.username}
                        </List.Header>
                    </List.Content>
                    <Divider style = {{margin: '0 5% 0 5%'}}/> 
                </List.Item>
            )
        }
        let buttonStyle = {
            position: 'absolute',
            right: '100px',
            marginTop: '40px',
        }
        // not following the follower
        if (!this.state.isFollow) {
            return (
                <List.Item style = {{position: 'relative'}}> 
                    <Image className = {hoverPart} onClick = {this.toProfile}
                    style = {{transform: 'scale(2)', margin: '40px 3% 40px 8%'}} 
                    avatar src = {this.props.follower.avatar}/>
                    <List.Content style = {{fontSize: '11.5.5pt'}}> 
                        <List.Header>    
                            {this.props.follower.username}
                        </List.Header>
                    </List.Content>
                    <Button color = 'blue' size = 'small' style = {buttonStyle}
                    onClick = {this.followHandler}>
                        Follow
                    </Button>
                    <Divider style = {{margin: '0 5% 0 5%'}}/> 
                </List.Item>
            )
        }
        // is following the follower
        return (
            <List.Item style = {{position: 'relative'}}> 
                <Image className = {hoverPart} onClick = {this.toProfile}
                style = {{transform: 'scale(2)', margin: '40px 3% 40px 8%'}} 
                avatar src = {this.props.follower.avatar}/>
                <List.Content style = {{fontSize: '11.5.5pt'}}> 
                    <List.Header>    
                        {this.props.follower.username}
                    </List.Header>
                </List.Content>
                <Button animated='fade' color = 'blue' size = 'small' style = {buttonStyle}
                onClick = {this.followHandler}>
                    <Button.Content visible>Following</Button.Content>
                    <Button.Content hidden>Unfollow</Button.Content>
                </Button>
                <Divider style = {{margin: '0 5% 0 5%'}}/> 
            </List.Item>
        ) 
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        user: state.user,
    }
}

export default connect(mapStateToProps, {setCurrentUser, setUser, clearUser})(withRouter(Follower));