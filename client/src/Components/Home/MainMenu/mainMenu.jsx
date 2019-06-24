import React, {Component} from 'react';
import Navibar from './Navibar/navibar.jsx';
import Searchbar from './Searchbar/searchbar.jsx';
import Subnavibar from './Subnavibar/subnavibar.jsx';


class MainMenu extends Component {
    render() {
        return(
            <div>
                <Navibar/>
                <Searchbar/>
                <Subnavibar current = {this.props.current}/>
            </div>
        )
    }
}

export default MainMenu;