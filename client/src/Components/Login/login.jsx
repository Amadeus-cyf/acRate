import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react';

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
    }

    emailHandler(event) {
        if (event.target.value.length === '') {
            return;
        }
        this.setState({
            email: event.target.value,
        });
    }

    passwordHandler(event) {
        if (event.target.value.length  === '') {
            return;
        }
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
                this.props.history.push('/login');
            }
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        return(
            <div>
                <input type = 'text' onChange = {this.emailHandler} value = {this.state.email}/>
                <input type = 'text' onChange = {this.passwordHandler} value = {this.state.password}/>
                <Button onClick = {this.loginHandler}>Login</Button>
            </div>
        )
    }
}

export default Login;