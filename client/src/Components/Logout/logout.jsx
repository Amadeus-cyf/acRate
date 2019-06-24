import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearCurrentUser} from '../../store/action.js';
import {container, logoutStyle} from './logout.module.scss';

class Logout extends Component {
    componentDidMount() {
       this.props.clearCurrentUser(this.props.history);
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

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}
  
export default connect(mapStateToProps, {clearCurrentUser})(Logout);

//export default Logout;