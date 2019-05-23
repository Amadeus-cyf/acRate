import React, {Component} from 'react';
import {Input} from 'semantic-ui-react';
import {backgroundStyle} from './searchbar.module.scss';

class Searchbar extends Component {
    render() {
        let searchbarStyle = {
            'float': 'right',
            'margin-right': '15%',
            'margin-top': '160px',
        }
        return(
            <div className = {backgroundStyle}>
                <Input style = {searchbarStyle} icon='search'  size = 'big' type = 'text' placeholder = 'Search here' />
            </div>
        )

    }
}

export default Searchbar;