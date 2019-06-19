import React, {Component} from 'react';
import axios from 'axios';
import {List, Image, Button, Divider} from 'semantic-ui-react';
import CommentBox from '../CommentBox/commentBox.jsx';
import Likebar from '../Likebar/likebar.jsx';
import NoneditStarRating from '../../Information/Score/noneditRating.jsx';
import {avatarStyle, usernameStyle, replyAvatarStyle} from './comment.module.scss';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            newReply: '',
            replyDisplay: 'none',
            replyList: [],
            repliedComment: {},
        }
        this.inputReply = this.inputReply.bind(this);
        this.submitReply = this.submitReply.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        axios.get('api/comment/reply/' + this.props.comment._id)
        .then(response => {
            this.setState({
                replyList: response.data.data.comments,
            })
        }).catch(err => {
            alert(err)
        })
    }

    inputReply(event) {
        this.setState({
            newReply: event.target.value,
        })
    }

    submitReply() {
        let replyList = this.state.replyList;
        let comment = {
            anime_id: this.props.bangumi.mal_id,
            parentComment_id: this.props.comment._id,
            commentContent: this.state.newReply,
            username: this.props.currentUser.username,
            avatar: this.props.currentUser.avatar,
            user_id: this.props.currentUser._id,
            repliedComment_id: this.state.repliedComment._id,
            repliedUsername: this.state.repliedComment.username,
            date: new Date(),
            like: [],
            dislike: [],
        }
        replyList.push(comment);
        this.setState({
            replyList: replyList,
        })
        let newReply = this.state.newReply;
        this.setState({
            newReply: '',
            replyDisplay: 'none',
        })
        axios('api/comment/', {
            method: 'POST',
            data: {
                anime_id: this.props.bangumi.mal_id,
                parentComment_id: this.props.comment._id,
                commentContent: newReply,
                username: this.props.currentUser.username,
                user_id: this.props.currentUser._id,
                avatar: this.props.currentUser.avatar,
                repliedComment_id: this.state.repliedComment._id,
                repliedUsername: this.state.repliedComment.username,
                repliedAvatar: this.state.repliedComment.avatar,
                date: new Date(),
            }
        }).then()
        .catch(err => {
            alert(err);
        })
    }

    cancelReply() {
        this.setState({
            newReply: '',
            replyDisplay: 'none',
        })
    }

    replyComment(comment) {
        this.setState({
            replyDisplay: 'block',
            repliedComment: comment,
        })
    }

    toProfile(user_id) {
        this.props.history.push('/userProfile/' + user_id);
    }

    render() {
        let replyList = [];
        if (this.state.replyList.length > 0) {
            replyList = this.state.replyList.map(reply => {
                let atstyle = {
                    display: 'inline'
                }
                if (reply.repliedComment_id === reply.parentComment_id) {
                    atstyle = {
                        display: 'none'
                    }
                }
                let date = new Date(reply.date);
                let minute = date.getMinutes();
                if (minute < 10) {
                    minute = "0" + minute;
                }
                let avatar = '';
                if (reply.avatar) {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let avatarStr = this.arrayBufferToBase64(reply.avatar.data.data);
                    avatar = base64Flag + avatarStr;
                } else {
                    avatar = 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg';
                }
                return (
                    <List.Item style = {{'font-family': "'PT Sans Caption', sans-serif", 'margin-top': '20px'}}>
                        <List.Content style = {{'margin-left': '60px'}}>
                            <List.Header style = {{'font-size': '12pt'}}>
                                <Image onClick = {this.toProfile.bind(this, reply.user_id)}
                                className = {replyAvatarStyle} style = {{'margin-right': '10px'}} avatar src = {avatar}/>
                                {reply.username} 
                                <span style = {atstyle}>@ {reply.repliedUsername}</span>
                            </List.Header>
                            <p style = {{'margin-top': '10px'}}>
                                {date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}
                                <span style = {{'padding-left': '5px'}}>{date.getHours()}:{minute}</span>
                            </p>
                            <List.Description style = {{'font-size': '11pt', 'margin-top': '10px'}}>
                                {reply.commentContent}
                            </List.Description>
                            <Button icon='edit' content = 'Reply' 
                            onClick = {this.replyComment.bind(this, reply)} style = {{'margin-top': '10px'}} 
                            size = 'tiny' color = 'blue' disabled = {this.props.currentUser && 
                            reply.username === this.props.currentUser.username}/>
                            <Likebar currentUser = {this.props.currentUser} comment = {reply}/>
                        </List.Content>
                    </List.Item>
                )
            })
        }
        let date = new Date(this.props.comment.date);
        let minute = date.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        let avatar = '';
        if (this.props.comment.avatar) {
            let base64Flag = 'data:image/jpeg;base64,';
            let avatarStr = this.arrayBufferToBase64(this.props.comment.avatar.data.data);
            avatar = base64Flag + avatarStr;
        } else {
            avatar = 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg';
        }
        return(
            <List.Item style = {{'font-family': "'PT Sans Caption', sans-serif"}}>
                <Divider/>
                <Image onClick = {this.toProfile.bind(this, this.props.comment.user_id)} 
                className = {avatarStyle} avatar src = {avatar}/>
                <List.Content style = {{'margin-left': '30px', 'margin-top': '50px'}}>
                    <List.Header style = {{'font-size': '14pt'}}>
                        <div className = {usernameStyle}>
                            <p style = {{'padding-right': '10px'}}>{this.props.comment.username}</p>
                            <span style = {this.props.starDisplay}>
                                <NoneditStarRating average = {this.props.score}/>
                            </span>
                        </div>
                    </List.Header>
                    <p style = {{'margin-top': '10px'}}>
                        {date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}
                        <span style = {{'padding-left': '5px'}}>{date.getHours()}:{minute}</span>
                        <span style = {{'margin-left': '10px'}}>{replyList.length} reply/replies</span>
                    </p>
                    <List.Description style = {{'font-size': '12pt', 'margin-top': '20px'}}>
                        {this.props.comment.commentContent}
                    </List.Description>
                    <Button icon = 'edit' content = 'Reply' 
                    onClick = {this.replyComment.bind(this, this.props.comment)} 
                    style = {{'margin-top': '20px'}} size = 'tiny' color = 'blue' 
                    disabled = {this.props.currentUser && 
                    this.props.comment.username === this.props.currentUser.username}/>
                    <Likebar currentUser = {this.props.currentUser} comment = {this.props.comment}/>
                </List.Content>
                <List>
                    {replyList}
                </List>
                <div style= {{display: this.state.replyDisplay, 'margin-top': '20px'}}>
                    <CommentBox bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}
                    newComment = {this.state.newReply} inputComment = {this.inputReply} 
                    submitComment = {this.submitReply} cancelComment = {this.cancelReply}/>
                </div>
            </List.Item>
        )
    }
}

export default Comment;