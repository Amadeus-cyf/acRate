import React, {Component} from 'react';
import Navibar from './Navibar/navibar.jsx';
import Searchbar from './Searchbar/searchbar.jsx';
import Subnavibar from './Subnavibar/subnavibar.jsx';


class MainMenu extends Component {
    render() {
        return(
            <div>
                <Navibar history = {this.props.history}/>
                <Searchbar history = {this.props.history}/>
                <Subnavibar history = {this.props.history}/>
            </div>
        )
    }
}

export default MainMenu;