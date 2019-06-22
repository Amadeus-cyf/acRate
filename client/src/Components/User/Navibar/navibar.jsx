import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react';
import {navibarStyle, imageStyle, usermenuStyle} from './navibar.module.scss';
import UserMenu from './UserMenu/userMenu.jsx';

class Navibar extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: 'undefined',
            logoutDisplay: 'none',
            menuDisplay: 'none',
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.avatarEnter = this.avatarEnter.bind(this);
        this.menuLeave = this.menuLeave.bind(this);
        this.toProfile = this.toProfile.bind(this);
    }
    
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    toHomePage() {
        this.props.history.push('/');
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

    toProfile() {
        if (this.props.currentUser === 'undefined') {
            return;
        }
        this.props.history.push('/user/userProfile/' + this.props.currentUser._id);
    }

    render() {
        let homeStyle = {
            marginLeft: '2%',
            background: 'rgba(255, 120, 195, 1)',
            color: 'white',
        }
        let logoutStyle = {
            float: 'right',
            marginRight: '2%',
            background: 'rgba(255, 120, 195, 1)',
            color: 'white',
        }
        let menuStyle = {
            display: this.state.menuDisplay,
        }
        let avatar = '';
        if (this.props.currentUser) {
            if (this.props.currentUser.avatar) {
                let base64Flag = 'data:image/jpeg;base64,';
                let avatarStr = this.arrayBufferToBase64(this.props.currentUser.avatar.data.data);
                avatar =  base64Flag + avatarStr;
            } else {
                avatar = 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg';
            }
        }
        return(
            <div>
                <div className = {navibarStyle}>
                    <Button size = 'large' onClick = {this.toHomePage} style = {homeStyle}>Home</Button>
                    <Button size = 'large' onClick = {this.logoutHandler} style = {logoutStyle} 
                    disabled = {this.props.currentUser === 'undefined'}>Log Out</Button>
                    <span className = {usermenuStyle} onMouseEnter = {this.avatarEnter} onMouseLeave = {this.menuLeave}>
                        <Image onClick = {this.toProfile.bind(this)} 
                        className = {imageStyle} avatar src = {avatar}/>
                        <div style = {menuStyle}>
                            <UserMenu currentUser = {this.props.currentUser}
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