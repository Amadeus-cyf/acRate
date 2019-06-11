import React, {Component} from 'react';
import axios from 'axios';
import {List} from 'semantic-ui-react';
import CommentBox from './CommentBox/commentBox.jsx';
import Comment from './Comment/comment.jsx';
import {commentStyle} from './commentlist.module.scss';

class Commentlist extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            newComment: '',
            replyDisplay: 'none',
        }
        this.inputComment = this.inputComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
    }

    componentDidMount() {
        axios.get('api/comment/parentcomment/' + this.props.bangumi.mal_id)
        .then(response => {
            this.setState({
                comments: response.data.data.comments,
            })
        }).catch(err => {
            alert(err);
        })
    }

    inputComment(event) {
        this.setState({
            newComment: event.target.value,
        })
    }

    submitComment() {
        let commentList = this.state.comments;
        let comment = {
            anime_id: this.props.bangumi.mal_id,
            parentComment_id: 'none',
            commentContent: this.state.newComment,
            username: this.props.currentUser.username,
            avatar: this.props.currentUser.avatar,
            repliedComment_id: 'none',
            repliedUsername: 'none',
            repliedAvatar: 'none',
            date: new Date(),
            like: 0,
            dislike: 0,
        }
        commentList.push(comment);
        this.setState({
            comments: commentList,
        })
        axios('api/comment/', {
            method: 'POST',
            headers:  {
                'content-type': 'application/json',
            },
            data: {
                anime_id: this.props.bangumi.mal_id,
                parentComment_id: 'none',
                commentContent: this.state.newComment,
                username: this.props.currentUser.username,
                avatar: this.props.currentUser.avatar,
                repliedComment_id: 'none',
                repliedUsername: 'none',
                repliedAvatar: 'none',
            }
        }).then(() => {
            this.setState({
                newComment: '',
            })
        })
        .catch(err => {
            alert(err);
        })
    }

    cancelComment() {
        this.setState({
            newComment: '',
        })
    }

    render() {
        let commentList = this.state.comments.map(comment => {
            return (
                <Comment bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}
                comment = {comment}/>
            )
        })
        if (commentList.length === 0) {
            return(
                <div className = {commentStyle}>
                    <h2>Be the first comment</h2>
                    <CommentBox bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}
                    newComment = {this.state.newComment} inputComment = {this.inputComment} 
                    submitComment = {this.submitComment} cancelComment = {this.cancelComment}/>
                </div>
            )
        }
        return(
            <div className = {commentStyle}>
                <h2>{commentList.length} comments</h2>
                <CommentBox 
                bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}
                newComment = {this.state.newComment} inputComment = {this.inputComment} 
                submitComment = {this.submitComment} cancelComment = {this.cancelComment}/>
                <List style = {{'margin-top': '20px'}}>
                    {commentList}
                </List>
            </div>
        )
    }
}

export default Commentlist;