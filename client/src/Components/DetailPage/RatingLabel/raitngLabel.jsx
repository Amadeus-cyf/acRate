import React, {Component} from 'react';
import {Label} from 'semantic-ui-react';
import Rating from './Rating/rating.jsx';

class RatingLabel extends Component {
    render() {
        let labelStyle = {
            padding: '150px 150px 150px 150px',
            background: 'white',
        }
        return (
            <Label style = {labelStyle}>
                <Rating />
            </Label>
        )
    }
}

export default RatingLabel;