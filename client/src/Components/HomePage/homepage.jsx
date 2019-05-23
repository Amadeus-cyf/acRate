import React, {Component} from 'react';
import axios from 'axios';
import {Image} from 'semantic-ui-react';
import MainMenu from '../MainMenu/mainMenu.jsx';
import Navibar from '../MainMenu/Navibar/navibar.jsx';
import RecentBangumi from './RecentBangumi/recentBangumi.jsx';
import {homeStyle, pageContainer, imageStyle, textStyle, footer} from './homepage.module.scss';

class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            username: 'undefined',
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toManga = this.toManga.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
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

    toHomePage() {
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
    }

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
                        <div>
                            <Image className = {imageStyle} src="http://b-ssl.duitang.com/uploads/item/201701/20/20170120164701_Zjuwi.thumb.224_0.gif" alt = 'loading'/>
                        </div>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </div>
                </div>
            )
        }
        return(
            <div className = {homeStyle}>
                <MainMenu 
                toHomePage = {this.toHomePage}
                loginHandler = {this.loginHandler}
                signupHandler = {this.signupHandler}
                logoutHandler = {this.logoutHandler}
                toBangumi = {this.toBangumi}
                toManga = {this.toManga}/>
                <RecentBangumi/>
                <div className = {footer}>
                    <h3>Aniscore</h3>
                </div>
            </div>
        )
    }
}

export default HomePage;