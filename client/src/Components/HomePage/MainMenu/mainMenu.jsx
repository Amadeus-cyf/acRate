import React, {Component} from 'react';
import axios from 'axios';
import Navibar from './Navibar/navibar.jsx';
import Searchbar from './Searchbar/searchbar.jsx';
import Subnavibar from './Subnavibar/subnavibar.jsx';
import {pageContainer, imageStyle, textStyle} from './mainMenu.module.scss';


class MainMenu extends Component {
    constructor() {
        super();
        this.state = {
            username: 'undefined',
        }
        /*this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toManga = this.toManga.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);*/
    }

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(response => {
            if (response.data.message === 'success') {
                this.setState({
                    username: response.data.data.username,
                })
            } else if (response.data.message === 'not login') {
                this.setState({
                    username: 'no user',
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    /*toHomePage() {
        this.props.history.push('/');
    }

    toBangumi() {
        this.props.history.push('/bangumi');
    }

    toManga() {
        this.props.history.push('/manga');
    }

    loginHandler() {
        this.props.history.push('/login');
    }

    signupHandler() {
        this.props.history.push('/signup');
    }

    logoutHandler() {
        this.props.history.push('/logout');
    }*/


    render() {
        if (this.state.username === 'undefined') {
            return(
                <div>
                    <Navibar
                    toHomePage = {this.props.toHomePage}
                    loginHandler = {this.props.loginHandler}
                    signupHandler = {this.props.signupHandler}
                    logoutHandler = {this.props.logoutHandler}/>
                    <div className = {pageContainer}>
                        <img className = {imageStyle} src="http://b-ssl.duitang.com/uploads/item/201701/20/20170120164701_Zjuwi.thumb.224_0.gif" alt = 'loading'/>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <Navibar
                toHomePage = {this.props.toHomePage}
                loginHandler = {this.props.loginHandler}
                signupHandler = {this.props.signupHandler}
                logoutHandler = {this.props.logoutHandler}/>
                <Searchbar/>
                <Subnavibar toHomePage = {this.props.toHomePage} toBangumi = {this.props.toBangumi} toManga = {this.props.toManga}/>
            </div>
        )
    }
}

export default MainMenu;