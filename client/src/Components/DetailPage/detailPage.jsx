import React, {Component} from 'react';
import axios from 'axios';

class DetailPage extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: 'undefined',
        }
    }
    
    componentDidMount() {
        axios.get('api/bangumi/' + this.props.match.params.anime_id)
        .then(response => {
            this.setState({
                bangumi: response.data.data.bangumi,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.bangumi === 'undefined') {
            return (<p></p>)
        }
        return(
            <div>
                {this.state.bangumi.title}
            </div>
        )
    }
}

export default DetailPage;