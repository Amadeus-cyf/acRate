import React, {Component} from 'react';
import axios from 'axios';
import {Icon} from 'semantic-ui-react';
import {barStyle, numberStyle} from './likebar.module.scss';

class Likebar extends Component {
    constructor() {
        super();
        this.state = {
            likeList: [],
            dislikeList: [],
        }
        this.likeHandler = this.likeHandler.bind(this);
        this.dislikeHandler = this.dislikeHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            likeList: this.props.comment.like,
            dislikeList: this.props.comment.dislike,
        })
    }

    likeHandler() {
        let likeList = this.state.likeList;
        let dislikeList = this.state.dislikeList;
        if (this.state.likeList.includes(this.props.currentUser._id)) {
            likeList.splice(this.state.likeList.indexOf(this.props.currentUser._id), 1);
        } else {
            likeList.push(this.props.currentUser._id);
        }
        if (this.state.dislikeList.includes(this.props.currentUser._id)) {
            dislikeList.splice(this.state.dislikeList.indexOf(this.props.currentUser._id), 1)
        }
        this.setState({
            likeList: likeList,
            dislikeList: dislikeList
        })
        axios('api/comment/' + this.props.comment._id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                user_id: this.props.currentUser._id,
                attitude: 'like',
            }
        }).then()
        .catch(err => {
            alert(err);
        })
    }

    dislikeHandler() {
        let likeList = this.state.likeList;
        let dislikeList = this.state.dislikeList;
        if (this.state.dislikeList.includes(this.props.currentUser._id)) {
            dislikeList.splice(this.state.likeList.indexOf(this.props.currentUser._id), 1);
        } else {
            dislikeList.push(this.props.currentUser._id);
        }
        if (this.state.likeList.includes(this.props.currentUser._id)) {
            likeList.splice(this.state.likeList.indexOf(this.props.currentUser._id), 1);
        }
        this.setState({
            likeList: likeList,
            dislikeList: dislikeList,
        })
        axios('api/comment/' + this.props.comment._id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                user_id: this.props.currentUser._id,
                attitude: 'dislike',
            }
        }).then()
        .catch(err => {
            alert(err);
        })
    }

    render() {
        if (!this.props.currentUser) {
            return (
                <span className = {barStyle}>
                    <Icon style = {{color: 'rgba(100, 100, 100, 0.6)'}} size = 'large' name = 'thumbs up outline' disabled/>
                    <span className = {numberStyle}>{this.state.likeList.length}</span>
                    <Icon style = {{color: 'rgba(100, 100, 100, 0.6)'}} size = 'large' name = 'thumbs down outline' disabled/>
                    <span className = {numberStyle}>{this.state.dislikeList.length}</span>
                </span> 
           )
        }
       if (this.state.likeList.includes(this.props.currentUser._id)) {
           return (
               <span className = {barStyle}>
                    <Icon style = {{color: 'rgba(100, 100, 100, 0.6)'}} size = 'large' onClick = {this.likeHandler} name = 'thumbs up'/>
                    <span className = {numberStyle}>{this.state.likeList.length}</span>
                    <Icon style = {{color: 'rgba(100, 100, 100, 0.6)'}} size = 'large' onClick = {this.dislikeHandler} name = 'thumbs down outline'/>
                    <span className = {numberStyle}>{this.state.dislikeList.length}</span>
               </span>
           )
       } else if (this.state.dislikeList.includes(this.props.currentUser._id)) {
            return (
                <span className = {barStyle}>
                    <Icon style = {{color: 'rgba(100, 100, 100, 0.6)'}} size = 'large' onClick = {this.likeHandler} name = 'thumbs up outline'/>
                    <span className = {numberStyle}>{this.state.likeList.length}</span>
                    <Icon style = {{color: 'rgba(100, 100, 100, 0.6)'}} size = 'large' onClick = {this.dislikeHandler} name = 'thumbs down'/>
                    <span className = {numberStyle}>{this.state.dislikeList.length}</span>
                </span>
            )
       } else {
           return (
                <span className = {barStyle}>
                    <Icon style = {{color: 'rgba(100, 100, 100, 0.6)'}} size = 'large' onClick = {this.likeHandler} name = 'thumbs up outline'/>
                    <span className = {numberStyle}>{this.state.likeList.length}</span>
                    <Icon style = {{color: 'rgba(100, 100, 100, 0.6)'}} size = 'large' name = 'thumbs down outline' onClick = {this.dislikeHandler}/>
                    <span className = {numberStyle}>{this.state.dislikeList.length}</span>
                </span> 
           )
       }
    }
}

export default Likebar;