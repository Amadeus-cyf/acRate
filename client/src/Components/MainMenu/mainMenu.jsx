import React, {Component} from 'react';
import Navibar from './Navibar/navibar.jsx';
import Searchbar from './Searchbar/searchbar.jsx';
import Subnavibar from './Subnavibar/subnavibar.jsx';


class MainMenu extends Component {
    render() {
        return(
            <div>
                <Navibar
                toHomePage = {this.props.toHomePage}
                loginHandler = {this.props.loginHandler}
                signupHandler = {this.props.signupHandler}
                logoutHandler = {this.props.logoutHandler}/>
                <Searchbar/>
                <Subnavibar toHomePage = {this.props.toHomePage} toBangumi = {this.props.toBangumi} toUpcoming = {this.props.toUpcoming}/>
            </div>
        )
    }
}

export default MainMenu;