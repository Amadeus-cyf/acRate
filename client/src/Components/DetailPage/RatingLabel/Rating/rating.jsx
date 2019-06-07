import React, {Component} from 'react';
import StarRating from 'react-star-ratings';

class Rating extends Component {
    constructor() {
        super();
        this.state = {
            rating: 0,
        }
    }

    changeRating(value, prevalue, name) {
        this.setState({
            rating: value,
        });
    }

    render() {
        return (                
            <StarRating 
                name = 'rating'
                numberOfStars={5}
                value={this.state.rating}
                rating = {this.state.rating}
                starEmptyColor = "#ffffff"
                starRatedColor = "#ffb440"
                starHoverColor = "#ffb400"
                changeRating={this.changeRating.bind(this)}
                editing = {true}
                isAggregateRating = {true}
                starDimension="20px"
                starSpacing="2px"
            />
        );
      }    
}

export default Rating;