import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setCurrentUser} from '../../store/action.js';
import Navibar from '../Home/MainMenu/Navibar/navibar.jsx';
import {Button, Form} from 'semantic-ui-react';
import {container, title, subtitle, imageStyle} from './login.module.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: 'success',
        }
        this.signupHandler = this.signupHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.formloginHandler = this.formloginHandler.bind(this);
    }

    emailHandler(event) {
        this.setState({
            email: event.target.value,
            message: 'success',
        });
    }

    passwordHandler(event) {
        this.setState({
            password: event.target.value,
            message: 'success',
        });
    }

    formloginHandler() {
        axios('api/auth/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        }).then(response => {
            if (response.data.message === 'Successfully Login') {
                this.props.setCurrentUser(response.data.data, this.props.history);        
            } else if (response.data.message === 'Could not find user') {
                this.setState({
                    password: '',
                    message: 'error',
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    signupHandler() {
        this.props.history.push('/signup');
    }
    
    render() {
        let formStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '15pt',
            margin: '10% 20% 10% 2%',
            'text-align': 'center',
        }
        let buttonStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '13pt',
            margin: '10px 25px 10px 25px',
        }
        let textStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '12pt',
            'color': 'red',
            display: 'block',
        }
        if (this.state.message === 'success') {
            textStyle.display = 'none';
        }
        let isvalid = (this.state.email === '' || this.state.password === '');
        return(
            <div>
                <Navibar history = {this.props.history}/>
                <div className = {container}>
                    <div className = {imageStyle}>
                    </div>
                    <Form onSubmit = {this.formloginHandler} style = {formStyle}>
                        <h3 className = {title}>Log In</h3>
                        <Form.Field>
                            <p style = {textStyle}>Incorrect email or password</p>
                            <div className = {subtitle}>
                                Email
                            </div>
                            <Form.Input size = 'big' name = 'email' value = {this.state.email}
                            onChange = {this.emailHandler} type = 'text' placeholder = 'your email'/>
                            <div className = {subtitle}>
                                Password
                            </div>
                            <Form.Input size = 'big' name = "password" value = {this.state.password}
                            onChange = {this.passwordHandler} type = 'password' placeholder = 'password'/>
                        </Form.Field>
                        <Button onClick = {this.formloginHandler} style= {buttonStyle} disabled={isvalid} color = 'blue'>Log in</Button>
                        <Button onClick = {this.signupHandler} style = {buttonStyle} color = 'blue'>Sign up</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}
  
export default connect(mapStateToProps, {setCurrentUser})(Login);