import React, {Component} from 'react';
import axios from 'axios';
import {List, Button, Divider} from 'semantic-ui-react';
import CommentBox from './CommentBox/commentBox.jsx';
import Comment from './Comment/comment.jsx';
import {commentStyle, numberlistStyle, footerStyle} from './commentlist.module.scss';

class Commentlist extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            pageNumber: 1,
            currentComments: 'undefined',
            newComment: '',
            replyDisplay: 'none',
            scoreInfo: 'undefined',
            commentNumber: 0,
        }
        this.inputComment = this.inputComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
    }

    componentDidMount() {
        axios.get('api/comment/parentcomment/' + this.props.bangumi.mal_id + '/' + this.state.currentPage)
        .then(response => {
            this.setState({
                currentComments: response.data.data.comments,
            })
        }).catch(err => {
            alert(err);
        })
        axios.get('api/comment/parentcomment/' + this.props.bangumi.mal_id +'/count')
        .then(response => {
            let commentNumber = response.data.data.commentNumber;
            let pageNumber = 1;
            if (commentNumber%20) {
                pageNumber = (commentNumber - commentNumber%20)/20+1;
            } else {
                pageNumber = commentNumber / 20;
            }
            this.setState({
                pageNumber: pageNumber,
                commentNumber: commentNumber,
            })
        })
        axios.get('api/bangumiScore/' + this.props.bangumi.mal_id)
        .then(response => {
            this.setState({
                scoreInfo: response.data.data.bangumiScore,
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
        if (this.state.commentNumber && this.state.commentNumber % 20 === 0) {
            let pageNumber  = this.state.pageNumber + 1;
            this.setState({
                pageNumber: pageNumber,
            })
        }
        let commentNumber = this.state.commentNumber + 1;
        this.setState({
            commentNumber: commentNumber,
            currentComments: 'undefined',
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
                user_id: this.props.currentUser._id,
                avatar: this.props.currentUser.avatar,
                repliedComment_id: 'none',
                repliedUsername: 'none',
                repliedAvatar: 'none',
                date: new Date(),
            }
        }).then(() => {
            this.setState({
                newComment: '',
                currentPage: 1,
            })
            axios.get('api/comment/parentcomment/' + this.props.bangumi.mal_id + '/' + this.state.currentPage)
            .then(response => {
                this.setState({
                    currentComments: response.data.data.comments,
                })
            }).catch(err => {
                alert(err);
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

    toPage(pageNumber) {
        this.setState({
            currentPage: pageNumber,
            currentComments: 'undefined',
        })
        axios.get('api/comment/parentcomment/' + this.props.bangumi.mal_id + '/' + pageNumber)
        .then(response => {
            this.setState({
                currentComments: response.data.data.comments,
            })
        }).catch(err => {
            alert(err);
        })
    }

    toPrevious() {
        let pageNumber =  this.state.currentPage-1;
        this.setState({
            currentPage: pageNumber,
            currentComments: 'undefined',
        })
        axios.get('api/comment/parentcomment/' + this.props.bangumi.mal_id + '/' + pageNumber)
        .then(response => {
            this.setState({
                currentComments: response.data.data.comments,
            })
        }).catch(err => {
            alert(err);
        })
    }

    toNext() {
        let pageNumber =  this.state.currentPage+1;
        this.setState({
            currentPage: pageNumber,
            currentComments: 'undefined',
        })
        axios.get('api/comment/parentcomment/' + this.props.bangumi.mal_id + '/' + pageNumber)
        .then(response => {
            this.setState({
                currentComments: response.data.data.comments,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.scoreInfo === 'undefined' || this.state.currentComments === 'undefined') {
            return <p style = {{'font-size': '14pt', 'text-align': 'center'}}>Fetching/Submitting comments...</p>
        }
        if (this.state.currentComments.length === 0) {
            return(
                <div className = {commentStyle}>
                    <h2>Be the first comment</h2>
                    <CommentBox bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}
                    newComment = {this.state.newComment} inputComment = {this.inputComment} 
                    submitComment = {this.submitComment} cancelComment = {this.cancelComment}/>
                </div>
            )
        }
        let commentList = this.state.currentComments.map(comment => {
            let starDisplay = {
                display: 'none',
            }
            let score = 0.0;
            for (let i = 5; i >= 1; i--) {
                if (this.state.scoreInfo[i].includes(comment.user_id)) {
                    starDisplay = {
                        display: 'block',
                    }
                    score = i;
                    break;
                }
            }
            return (
                <Comment bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}
                comment = {comment} starDisplay = {starDisplay} score = {score}/>
            )
        })
        let pageArr = [];
        for (let i = 0; i < this.state.pageNumber; i++) {
            pageArr.push(i+1);
        }
        let pageList = [];
        // process number list
        pageList = pageArr.map(page => {
            if (page === this.state.currentPage) {
                return(
                    <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                )
            }
            return(
                <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
            )
        })
        let previousStyle = {
            display: 'inline',
        }
        let nextStyle = {
            display: 'inline',
        }
        if (this.state.currentPage === 1) {
            previousStyle = {
                display: 'none',
            }
        }  
        if (this.state.currentPage === this.state.pageNumber) {
            nextStyle = {
                display: 'none',
            }
        }
        return(
            <div>
                <div className = {commentStyle}>
                    <h2>{this.state.commentNumber} comments</h2>
                    <CommentBox 
                    bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}
                    newComment = {this.state.newComment} inputComment = {this.inputComment} 
                    submitComment = {this.submitComment} cancelComment = {this.cancelComment}/>
                    <List style = {{'margin-top': '20px'}}>
                        {commentList}
                    </List>
                    <Divider style = {{'margin-top': '30px'}}/>
                    <div className = {numberlistStyle}>
                        <Button size = 'small' color = 'blue' onClick = {this.toPage.bind(this, 1)}>Page</Button>
                        <Button size = 'small' basic color = 'blue' style = {previousStyle} onClick = {this.toPrevious}>Prev</Button>
                        {pageList}
                        <Button size = 'small' basic color = 'blue' style = {nextStyle} onClick = {this.toNext}>Next</Button>
                    </div>
                </div>
                <div className = {footerStyle}>
                    <h2>Aniscore </h2>
                </div>
            </div>
        )
    }
}

export default Commentlist;