import React, {Component} from 'react';
import MainMenu from '../HomePage/MainMenu/mainMenu.jsx';

class Manga extends Component {
    constructor() {
        super();
        this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toManga = this.toManga.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
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
        return(
            <div>
                <MainMenu
                 toHomePage = {this.toHomePage}
                 loginHandler = {this.loginHandler}
                 signupHandler = {this.signupHandler}
                 logoutHandler = {this.logoutHandler}
                 toBangumi = {this.toBangumi}
                 toManga = {this.toManga}/>
            </div>
        )
    }
}

export default Manga;