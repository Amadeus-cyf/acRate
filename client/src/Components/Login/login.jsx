import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form, Input} from 'semantic-ui-react';
import {container, title, subtitle, imageStyle} from './login.module.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
    }

    emailHandler(event) {
        this.setState({
            email: event.target.value,
        });
    }

    passwordHandler(event) {
        this.setState({
            password: event.target.value,
        });
    }

    loginHandler() {
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
            if (response.data.status === 'Successfully Login') {
                this.props.history.push('/');
            } else if (response.data.status === 'Could not find user') {
                alert('Incorrect username or password')
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
        /*let inputStyle = {
            display: 'block',
            width: '100%',
        }*/
        let buttonStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '13pt',
            margin: '10px 25px 10px 25px',
        }
        let isvalid = (this.state.email === '' || this.state.password === '');
        return(
            <div className = {container}>
                <div className = {imageStyle}>
                </div>
                <Form onSubmit = {this.loginHandler} style = {formStyle}>
                    <h3 className = {title}>Log In</h3>
                    <Form.Field>
                        <div className = {subtitle}>
                            Email
                        </div>
                            <Input size = 'big' name = 'email' value = {this.state.email}
                            onChange = {this.emailHandler} type = 'text' placeholder = 'your email'/>
                        <div className = {subtitle}>
                            Password
                        </div>
                        <Input size = 'big' name = "password" value = {this.state.password}
                        onChange = {this.passwordHandler} type = 'password' placeholder = 'password'/>
                    </Form.Field>
                    <Button disabled={isvalid} type = 'submit' style= {buttonStyle}>Log in</Button>
                    <Button onClick = {this.signupHandler} style = {buttonStyle}>Sign up</Button>
                </Form>
            </div>
        )
    }
}

export default Login;