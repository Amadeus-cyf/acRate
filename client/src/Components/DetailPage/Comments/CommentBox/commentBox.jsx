import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react';
import {boxStyle, disableBoxStyle, buttonStyle} from './commentBox.module.scss';

class CommentBox extends Component {
    constructor() {
        super();
        this.state = {
            comment: '',
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
    }

    inputHandler(event) {
        this.setState({
            comment: event.target.value,
        })
    }

    submitComment() {
        axios('api/comment/', {
            method: 'POST',
            headers:  {
                'content-type': 'application/json',
            },
            data: {
                anime_id: this.props.bangumi.mal_id,
                parentComment_id: 'none',
                commentContent: this.state.comment,
                username: this.props.currentUser.username,
                avatar: this.props.currentUser.avatar,
                repliedComment_id: 'none',
                repliedUsername: 'none',
                repliedAvatar: 'none',
            }
        }).then(() => {
            window.location.reload();
        })
        .catch(err => {
            alert(err);
        })
    }

    cancelComment() {
        this.setState({
            comment: '',
        })
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div>
                    <textarea className = {boxStyle} value = {this.state.comment}
                    onChange = {this.inputHandler} placeholder = 'Add a comment'></textarea>
                    <div className = {buttonStyle}>
                        <Button onClick = {this.submitComment} disabled = {this.state.comment === ''} color = 'blue' size = 'big'>Submit</Button>
                        <Button style = {{'margin-left': '20px'}} onClick = {this.cancelComment} color = 'blue' size = 'big'>Cancel</Button>
                    </div>
                </div>
            )
        } else {
            return(
                <div className = {disableBoxStyle}>
                    You need to log in to comment
                </div>
            )
        }
    }
}

export default CommentBox;