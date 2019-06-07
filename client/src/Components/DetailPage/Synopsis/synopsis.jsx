import React, {Component} from 'react';
import {synopsisStyle} from './synopsis.module.scss';
import {Button} from 'semantic-ui-react';

class Synopsis extends Component {
    constructor() {
        super();
        this.state = {
            displayContent: '(No synopsis yet)',
            viewmoreDisplay: 'none',
            viewlessDisplay: 'none'
        }
        this.viewMore = this.viewMore.bind(this);
        this.viewLess = this.viewLess.bind(this);
    }

    componentDidMount() {
        if (!this.props.bangumi.synopsis) {
            return;
        }
        if (this.props.bangumi.synopsis.length < 300) {
            this.setState({
                displayContent: this.props.bangumi.synopsis,
            })
        } else {
            this.setState({
                displayContent: this.props.bangumi.synopsis.slice(0, 300) + '...',
                viewmoreDisplay: 'inline',
            })
        }
    }

    viewMore() {
        this.setState({
            displayContent: this.props.bangumi.synopsis,
            viewlessDisplay: 'inline',
            viewmoreDisplay: 'none',
        }) 
    }

    viewLess() {
        this.setState({
            displayContent: this.props.bangumi.synopsis.slice(0, 300) + '...',
            viewmoreDisplay: 'inline',
            viewlessDisplay: 'none',
        })
    }

    render() {
        let viewmoreStyle = {
            display: this.state.viewmoreDisplay,
        }
        let viewlessStyle = {
            display: this.state.viewlessDisplay
        }
        return (
            <div className = {synopsisStyle}>
                <h2>Synopsis:</h2>
                <p>{this.state.displayContent}</p>
                <Button style = {viewmoreStyle} onClick = {this.viewMore} size = 'tiny' color = 'blue'>View more</Button>
                <Button style = {viewlessStyle} onClick = {this.viewLess} size = 'tiny' color = 'blue'>View less</Button>
            </div>
        )
    }
}

export default Synopsis;