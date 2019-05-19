import React, {Component} from 'react';
import axios from 'axios';
import {Button, Form, Input} from 'semantic-ui-react';
import {container, title, subtitle, imageStyle} from './signup.module.scss';

class Signup extends Component {
     constructor() {
         super();
         this.state = {
             username: '',
             email: '',
             password: '',
             confirmPassword: '',
         }
         this.usernameHandler = this.usernameHandler.bind(this);
         this.emailHandler = this.emailHandler.bind(this);
         this.passwordHandler = this.passwordHandler.bind(this);
         this.confirmHandler = this.confirmHandler.bind(this);
         this.submitHandler = this.submitHandler.bind(this);
         this.cancelHandler = this.cancelHandler.bind(this);
     }

     usernameHandler(event) {
         this.setState({
            username: event.target.value,
         })
     }

     emailHandler(event) {
        this.setState({
           email: event.target.value,
        })
    }

    passwordHandler(event) {
        this.setState({
            password: event.target.value,
        })
    }

    confirmHandler(event) {
        this.setState({
            confirmPassword: event.target.value,
        })
    }

    submitHandler() {
        if (!this.state.email.includes('@')) {
            alert('Invalid email address');
            return;
        }
        if (this.state.password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            alert('Password is not the same');
            return;
        }
        axios('api/auth/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password, 
            }
        }).then(response => {
            if (response.data.message === 'Username already exists') {
                alert('Username already exists');
            } else if (response.data.message === 'Email already exists') {
                alert('Email already exists');
            } else {
                alert('Account created');
                this.props.history.push('/login');
            }
        }).catch(err => {
            alert(err);
        })
    }

    cancelHandler() {
        this.props.history.push('/login');
    }

    render() {
        let formStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '15pt',
            'text-align': 'center',
            background: 'white',
            margin: '5% 5% 5% 2%',
        }
        let inputStyle = {
            display: 'block',
            margin: '0 auto',
            width: '100%',
        }
        let buttonStyle = {
            'font-family': "'PT Sans Caption', sans-serif",
            'font-size': '13pt',
            margin: '20px 25px 20px 25px',
        }
        let isvalid = (this.state.username === '' || this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '');
        return(
            <div className = {container}>
                <div className = {imageStyle}>
                </div>
                <Form onSubmit = {this.submitHandler} style = {formStyle}>
                    <h3 className = {title}>Sign Up</h3>
                    <Form.Field>
                        <div className = {subtitle}>
                            Username
                        </div>
                        <Input size = 'big' name = 'username' value = {this.state.username}
                            onChange = {this.usernameHandler} type = 'text' placeholder = 'please enter your username' style = {inputStyle}/>
                        <div className = {subtitle}>
                            Email
                        </div>
                            <Input size = 'big' name = 'email' value = {this.state.email}
                            onChange = {this.emailHandler} type = 'text' placeholder = 'please enter your email address' style = {inputStyle}/>
                        <div className = {subtitle}>
                            Password
                        </div>
                        <Input size = 'big' name = "password" value = {this.state.password}
                        onChange = {this.passwordHandler} type = 'password' placeholder = 'password must be at least 8 characters' style = {inputStyle}/>
                        <div className = {subtitle}>
                            Confirm your Password
                        </div>
                        <Input size = 'big' name = "confirm password" value = {this.state.confirmPassword}
                        onChange = {this.confirmHandler} type = 'password' placeholder = 'enter password again' style = {inputStyle}/>
                    </Form.Field>
                    <Button disabled={isvalid} type = 'submit' style = {buttonStyle}>Create Account</Button>
                    <Button style = {buttonStyle} onClick = {this.cancelHandler}>Cancel</Button>
                </Form>
            </div>
        )
    }
}

export default Signup;