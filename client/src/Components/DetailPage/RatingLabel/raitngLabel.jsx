import React, {Component} from 'react';
import {Label} from 'semantic-ui-react';
import Rating from './Rating/rating.jsx';

class RatingLabel extends Component {
    render() {
        return (
            <Label>
                <Rating />
            </Label>
        )
    }
}

export default RatingLabel;