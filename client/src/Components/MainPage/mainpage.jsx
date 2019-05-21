import React, {Component} from 'react';
import axios from 'axios';
import Navibar from './Navibar/navibar.jsx';
import {pageContainer, imageStyle, textStyle} from './mainpage.module.scss';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            username: 'undefined',
        }
        this.toMainPage = this.toMainPage.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(response => {
            if (response.data.data !== undefined) {
                this.setState({
                    username: response.data.data.username,
                })
            } else {
                this.setState({
                    username: undefined,
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    toMainPage() {
        this.props.history.push('/');
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
                    tomainPage = {this.tomainPage}
                    loginHandler = {this.loginHandler}
                    signupHandler = {this.signupHandler}
                    logoutHandler = {this.logoutHandler}/>
                    <div className = {pageContainer}>
                        <img className = {imageStyle} src="http://b-ssl.duitang.com/uploads/item/201701/20/20170120164701_Zjuwi.thumb.224_0.gif"/>
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
                tomainPage = {this.tomainPage}
                loginHandler = {this.loginHandler}
                signupHandler = {this.signupHandler}
                logoutHandler = {this.logoutHandler}/>
            </div>
        )
    }
}

export default MainPage;