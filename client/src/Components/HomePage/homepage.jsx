import React, {Component} from 'react';
import axios from 'axios';
import Navibar from './Navibar/navibar.jsx';
import Searchbar from './Searchbar/searchbar.jsx';
import {pageContainer, imageStyle, textStyle} from './homepage.module.scss';


class HomePage extends Component {
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
                tomainPage = {this.tomainPage}
                loginHandler = {this.loginHandler}
                signupHandler = {this.signupHandler}
                logoutHandler = {this.logoutHandler}/>
                <Searchbar/>
            </div>
        )
    }
}

export default HomePage;