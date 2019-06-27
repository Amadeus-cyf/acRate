import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser, clearCurrentUser, setUser, clearUser} from '../../../../store/action.js';
import {Image, Button, List, Divider} from 'semantic-ui-react';

class Following extends Component {
    constructor() {
        super();
        this.state = {
            isFollow: true,
        }
        this.toProfile = this.toProfile.bind(this);
        this.followHandler = this.followHandler.bind(this);
    }

    toProfile() {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        this.props.setUser(this.props.following.user_id);
        this.props.history.push('/user/userProfile/' + this.props.following.user_id)
    }

    followHandler() {
        // unfollow the user
        if (this.state.isFollow) {
            this.setState({
                isFollow: false,
            })
            axios('api/user/' + this.props.currentUser._id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    unfollow_id: this.props.following.user_id
                }
            }).then(() => {
                this.props.setCurrentUser();
                this.props.setUser(this.props.currentUser._id);
            }).catch(err => {
                alert(err);
            })
        } else {
            this.setState({
                isFollow: true,
            })
            axios('api/user/' + this.props.currentUser._id, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                data: {
                    following_id: this.props.following.user_id,
                }
            }).then(() => {
                this.props.setCurrentUser();
                this.props.setUser(this.props.currentUser._id);
            }).catch(err => {
                alert(err);
            })
        }
    }

    render() {
        let buttonStyle = {
            position: 'absolute',
            right: '100px',
            marginTop: '5%',
        }
        if (this.props.currentUser._id !== this.props.user._id) {
            return (
                <List.Item style = {{position: 'relative'}}> 
                    <Image onClick = {this.toProfile}
                    style = {{transform: 'scale(2)', margin: '5% 3% 5% 8%'}} 
                    avatar src = {this.props.following.avatar}/>
                    <List.Content style = {{fontSize: '14pt'}}> 
                        <List.Header>    
                            {this.props.following.username}
                        </List.Header>
                    </List.Content>
                    <Divider style = {{margin: '0 5% 0 5%'}}/> 
                </List.Item>
            )
        }
        if (!this.state.isFollow) {
            return (
                <List.Item style = {{position: 'relative'}}> 
                    <Image onClick = {this.toProfile}
                    style = {{transform: 'scale(2)', margin: '5% 3% 5% 8%'}} 
                    avatar src = {this.props.following.avatar}/>
                    <List.Content style = {{fontSize: '14pt'}}> 
                        <List.Header>    
                            {this.props.following.username}
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
        return (
            <List.Item style = {{position: 'relative'}}> 
                <Image onClick = {this.toProfile}
                style = {{transform: 'scale(2)', margin: '5% 3% 5% 8%'}} 
                avatar src = {this.props.following.avatar}/>
                <List.Content style = {{fontSize: '14pt'}}> 
                    <List.Header>    
                        {this.props.following.username}
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

export default connect(mapStateToProps, {setCurrentUser, clearCurrentUser, 
setUser, clearUser})(withRouter(Following));