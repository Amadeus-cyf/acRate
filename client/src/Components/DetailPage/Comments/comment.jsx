import React, {Component} from 'react';
import axios from 'axios';
import {List, Image, Button} from 'semantic-ui-react';
import CommentBox from './CommentBox/commentBox.jsx';
import {commentStyle} from './comment.module.scss';

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
        }
    }

    componentDidMount() {
        axios.get('api/comment/' + this.props.bangumi.mal_id)
        .then(response => {
            this.setState({
                comments: response.data.data.comments,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        let commentList = this.state.comments.map(comment => {
            return (
                   <List.Item>
                       <Image avatar src = {comment.avatar}/>
                        <List.Content>
                            <List.Header>
                                {comment.username}
                            </List.Header>
                            <List.Description>
                                {comment.commentContent}
                            </List.Description>
                            <Button size = 'mini' color = 'blue'>Reply</Button>
                           
                        </List.Content>
                   </List.Item>
            )
        })
        if (commentList.length === 0) {
            return(
                <div className = {commentStyle}>
                    <h2>Be the first comment</h2>
                    <CommentBox bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}/>
                    <List style = {{'margin-top': '20px'}}>
                        {commentList}
                    </List>
                </div>
            )
        }
        return(
            <div className = {commentStyle}>
                <h2>{commentList.length} comments</h2>
                <CommentBox bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}/>
                <List style = {{'margin-top': '20px'}}>
                    {commentList}
                </List>
            </div>
        )
    }
}

export default Comments;