import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearUser, setUser} from '../../../../store/action.js';
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
        this.toProfile = this.toProfile.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUser === 'undefined') {
            this.setState({
                loginDisplay: 'inline',
                signupDisplay: 'inline',
                logoutDisplay: 'none',
            })
            return;
        } else {
            this.setState({
                loginDisplay: 'none',
                signupDisplay: 'none',
                logoutDisplay: 'inline',
            })
        }
        if (this.props.currentUser.avatar) {
            //let base64Flag = 'data:image/jpeg;base64,';
            //let avatarStr = this.arrayBufferToBase64(this.props.currentUser.avatar.data.data);
            this.setState({
                avatar: this.props.currentUser.avatar
            })
        } else {
            this.setState({
                avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
            })
        }
    }

    toHomePage() {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        this.props.history.push('/');
    }

    loginHandler() {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        this.props.history.push('/login');
    }

    signupHandler() {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        this.props.history.push('/signup');
    }

    logoutHandler() {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
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
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        if (this.props.currentUser === 'undefined') {
            this.props.history.push('/login');
        } else {
            this.props.setUser(this.props.currentUser._id);
            this.props.history.push('/user/userProfile/' + this.props.currentUser._id);
        }
    }

    render() {
        let homeStyle = {
            marginLeft: '2%',
            background: 'rgba(255, 120, 195, 1)',
            color: 'white',
        }
        let loginStyle = {
            display: this.state.loginDisplay,
            float: 'right',
            margin: '0',
            background: 'rgba(255, 120, 195, 1)',
            color: 'white',
        }
        let signupStyle = {
            display: this.state.signupDisplay,
            float: 'right',
            marginRight: '2%',
            background: 'rgba(255, 120, 195, 1)',
            color: 'white',
        }
        let logoutStyle = {
            display: this.state.logoutDisplay,
            float: 'right',
            marginRight: '2%',
            background: 'rgba(255, 120, 195, 1)',
            color: 'white',
        }
        let menuStyle = {
            display: this.state.menuDisplay,
        }
        return(
            <div>
                <div className = {navibarStyle}>
                    <Button size = 'large' onClick = {this.toHomePage} style = {homeStyle}>Home</Button>
                    <Button  size = 'large' onClick = {this.signupHandler} style = {signupStyle}>Sign Up</Button>
                    <Button size = 'large' onClick = {this.loginHandler} style = {loginStyle}>Log In</Button>
                    <Button size = 'large' onClick = {this.logoutHandler} style = {logoutStyle}>Log Out</Button>
                    <span className = {usermenuStyle} onMouseEnter = {this.avatarEnter} onMouseLeave = {this.menuLeave}>
                        <Image onClick = {this.toProfile} 
                        className = {imageStyle} avatar src = {this.state.avatar}/>
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

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        user: state.user,
    }
}

export default connect(mapStateToProps, {clearUser, setUser})(withRouter(Navibar));
