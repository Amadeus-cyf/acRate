import React, {Component} from 'react';
import axios from 'axios';
import {container, logoutStyle} from './logout.module.scss';

class Logout extends Component {
    componentDidMount() {
        axios.post('api/auth/logout')
        .then(response=> {
            if (response.data.message === 'Log Out Successfully') {
                this.props.history.push('/');
            }
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        return(
            <div className = {container}>
                <div className = {logoutStyle}>
                    You have Succesfully Logged Out
                </div>
                <div className = {logoutStyle}>
                    Redirecting to Main Page
                </div>
            </div>
        )
    }
}

export default Logout;