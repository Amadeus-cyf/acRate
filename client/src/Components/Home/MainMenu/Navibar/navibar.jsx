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
            loginDisplay: 'inline',
            signupDisplay: 'inline',
            logoutDisplay: 'none',
            avatar: defaultAvatar,
            menuDisplay: 'none',
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.avatarEnter = this.avatarEnter.bind(this);
        this.menuLeave = this.menuLeave.bind(this);
    }
    
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(res => {
            if (res.data.message === 'success') {
                this.setState({
                    currentUser: res.data.data,
                    logoutDisplay: 'inline',
                    loginDisplay: 'none',
                    signupDisplay: 'none',
                    size: '13pt',
                })
                if (res.data.data.avatar) {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let avatarStr = this.arrayBufferToBase64(res.data.data.avatar.data.data);
                    this.setState({
                        avatar: base64Flag + avatarStr,
                    })
                } else {
                    this.setState({
                        avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
                    })
                }
            } else {
                this.setState({
                    loginDisplay: 'inline',
                    signupDisplay: 'inline',
                    logoutDisplay: 'none',
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    toHomePage() {
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

    toProfile(user_id) {
        this.props.history.push('/userProfile/' + user_id);
        window.location.reload();
    }

    render() {
        let homeStyle = {
            fontFamily: "'PT Sans Caption', sans-serif",
            fontSize: '15pt',
            color: 'rgba(255, 255, 255, 0.95)',
            margin: '1% 0% 1% 2%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let loginStyle = {
            fontFamily: "'PT Sans Caption', sans-serif",
            fontSize: '15pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.loginDisplay,
            float: 'right',
            margin: '1% 0% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let signupStyle = {
            fontFamily: "'PT Sans Caption', sans-serif",
            fontSize: '15pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.signupDisplay,
            float: 'right',
            margin: '1% 2% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let logoutStyle = {
            fontFamily: "'PT Sans Caption', sans-serif",
            fontSize: '15pt',
            color: 'rgba(255, 255, 255, 0.95)',
            display: this.state.logoutDisplay,
            float: 'right',
            margin: '1% 2% 1% 0%',
            background: 'rgba(255, 120, 195, 1)',
        }
        let menuStyle = {
            display: this.state.menuDisplay,
        }
        return(
            <div>
                <div className = {navibarStyle}>
                    <Button onClick = {this.toHomePage} style = {homeStyle}>Home</Button>
                    <Button onClick = {this.signupHandler} style = {signupStyle}>Sign Up</Button>
                    <Button onClick = {this.loginHandler} style = {loginStyle}>Log In</Button>
                    <Button onClick = {this.logoutHandler} style = {logoutStyle}>Log Out</Button>
                    <span className = {usermenuStyle} onMouseEnter = {this.avatarEnter} onMouseLeave = {this.menuLeave}>
                        <Image onClick = {this.toProfile.bind(this, this.state.currentUser._id)} className = {imageStyle} style = {this.state.avatarStyle}  avatar src = {this.state.avatar}/>
                        <div style = {menuStyle}>
                            <UserMenu currentUser = {this.state.currentUser}
                            loginHandler = {this.loginHandler}
                            signupHandler = {this.signupHandler}
                            logoutHandler = {this.logoutHandler}/>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default Navibar;