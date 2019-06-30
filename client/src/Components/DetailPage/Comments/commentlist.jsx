import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {List, Button, Divider} from 'semantic-ui-react';
import CommentBox from './CommentBox/commentBox.jsx';
import Comment from './Comment/comment.jsx';
import {commentStyle, numberlistStyle, numberStyle} from './commentlist.module.scss';
import paging from '../../Home/paging.jsx';

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

    async submitComment() {
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
        try {
            await axios('api/comment/', {
                method: 'POST',
                data: {
                    anime_id: this.props.bangumi.mal_id,
                    parentComment_id: 'none',
                    commentContent: this.state.newComment,
                    username: this.props.currentUser.username,
                    user_id: this.props.currentUser._id,
                    avatar: this.props.currentUser.avatar,
                    repliedComment_id: 'none',
                    repliedUsername: 'none',
                    date: new Date(),
                }
            });
        } catch(err) {
            alert(err);
        }
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
    }

    cancelComment() {
        this.setState({
            newComment: '',
        })
    }

    toPage(pageNumber) {
        if (this.state.currentPage === pageNumber) {
            return;
        }
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
            return <p style = {{fontSize: '14pt', textAlign: 'center', paddingBottom: '10%'}}>
            Fetching/Submitting comments...</p>
        }
        if (this.state.currentComments.length === 0) {
            return(
                <div>
                    <div className = {commentStyle}>
                        <h2>Be the first to comment</h2>
                        <CommentBox bangumi = {this.props.bangumi} currentUser = {this.props.currentUser}
                        newComment = {this.state.newComment} inputComment = {this.inputComment} 
                        submitComment = {this.submitComment} cancelComment = {this.cancelComment}/>
                    </div>
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
                <Comment bangumi = {this.props.bangumi} comment = {comment} 
                starDisplay = {starDisplay} score = {score}/>
            )
        })
        let pageArr = [];
        for (let i = 1; i <= this.state.pageNumber; i++) {
            pageArr.push(i);
        }
        let pageList = [];
        // process number list
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
        pageList = pageArr.map(page => {
            return paging(page, this.state.currentPage, this.state.pageNumber, 
                this.toPage.bind(this, page),numberStyle);
        })
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
                        <Button size = 'small' color = 'blue' 
                        onClick = {this.toPage.bind(this, 1)}>Page</Button>
                        <Button size = 'small' basic color = 'blue' 
                        style = {previousStyle} onClick = {this.toPrevious}>Prev</Button>
                        {pageList}
                        <Button size = 'small' basic color = 'blue' 
                        style = {nextStyle} onClick = {this.toNext}>Next</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Commentlist);