import React, {Component} from 'react';
import axios from 'axios';
import {Button, Image} from 'semantic-ui-react';
import {navibarStyle} from './navibar.module.scss';

class Navibar extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: 'undefined',
            loginDisplay: 'none',
            signupDisplay: 'none',
            logoutDisplay: 'none',
            avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
        }
    }

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(res => {
            if (res.data.data !== undefined) {
                this.setState({
                    currentUser: res.data.data,
                    logoutDisplay: 'inline',
                    avatar: res.data.data.avatar,
                })
            } else {
                this.setState({
                    loginDisplay: 'inline',
                    signupDisplay: 'inline',
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        let mainStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '13pt',
            color: 'rgba(255, 255, 255, 0.95)',
            'margin': '1% 0% 1% 2%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let loginStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '13pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.loginDisplay,
            float: 'right',
            'margin': '1% 0% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let signupStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '13pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.signupDisplay,
            float: 'right',
            'margin': '1% 2% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let logoutStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '13pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.logoutDisplay,
            float: 'right',
            'margin': '1% 2% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let avatarStyle = {
            'font-size': '13pt',
            display: this.state.logoutDisplay,
            float: 'right',
            'margin': '1% 2% 1% 0%',
        }
        return(
            <div className = {navibarStyle}>
                <Button onClick = {this.props.toMainPage} style = {mainStyle}>Main Page</Button>
                <Button onClick = {this.props.signupHandler} style = {signupStyle}>Sign Up</Button>
                <Button onClick = {this.props.loginHandler} style = {loginStyle}>Log In</Button>
                <Button onClick = {this.props.logoutHandler} style = {logoutStyle}>Log Out</Button>
                <Image style = {avatarStyle} avatar src = {this.state.avatar}/>
            </div>
        )
    }
}

export default Navibar;