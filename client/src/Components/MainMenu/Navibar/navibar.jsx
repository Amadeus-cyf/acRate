import React, {Component} from 'react';
import axios from 'axios';
import {Button, Image} from 'semantic-ui-react';
import {navibarStyle, imageStyle, usermenuStyle} from './navibar.module.scss';
import defaultAvatar from './defaultAvatar.jpg';
import UserMenu from './UserMenu/userMenu.jsx';

class Navibar extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: 'undefined',
            loginDisplay: 'none',
            signupDisplay: 'none',
            logoutDisplay: 'none',
            avatar: defaultAvatar,
            menuDisplay: 'none',
        }
        this.avatarEnter = this.avatarEnter.bind(this);
        this.menuLeave = this.menuLeave.bind(this);
    }

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(res => {
            if (res.data.message === 'success') {
                this.setState({
                    currentUser: res.data.data,
                    logoutDisplay: 'inline',
                    avatar: res.data.data.avatar,
                    size: '13pt',
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

    avatarEnter() {
        this.setState({
            menuDisplay: 'block',
        })
    }

    menuLeave() {
        this.setState({
            menuDisplay: 'none',
        })
    }

    render() {
        let homeStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '15pt',
            color: 'rgba(255, 255, 255, 0.95)',
            'margin': '1% 0% 1% 2%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let loginStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '15pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.loginDisplay,
            float: 'right',
            'margin': '1% 0% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let signupStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '15pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.signupDisplay,
            float: 'right',
            'margin': '1% 2% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let logoutStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '15pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.logoutDisplay,
            float: 'right',
            'margin': '1% 2% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let menuStyle = {
            display: this.state.menuDisplay,
        }
        return(
            <div>
                <div className = {navibarStyle}>
                    <Button onClick = {this.props.toHomePage} style = {homeStyle}>Home</Button>
                    <Button onClick = {this.props.signupHandler} style = {signupStyle}>Sign Up</Button>
                    <Button onClick = {this.props.loginHandler} style = {loginStyle}>Log In</Button>
                    <Button onClick = {this.props.logoutHandler} style = {logoutStyle}>Log Out</Button>
                    <span className = {usermenuStyle} onMouseEnter = {this.avatarEnter} onMouseLeave = {this.menuLeave}>
                        <Image className = {imageStyle} style = {this.state.avatarStyle}  avatar src = {this.state.avatar}/>
                        <div style = {menuStyle}>
                            <UserMenu 
                            loginHandler = {this.props.loginHandler}
                            signupHandler = {this.props.signupHandler}
                            logoutHandler = {this.props.logoutHandler}/>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default Navibar;