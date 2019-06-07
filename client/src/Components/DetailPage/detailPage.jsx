import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import axios from 'axios';
import Information from './Information/information.jsx';
import Synopsis from './Synopsis/synopsis.jsx';
import Navibar from '../Home/MainMenu/Navibar/navibar.jsx';
import {pageContainer,textStyle, imageStyle} from '../Home/AllBangumi/allBangumi.module.scss';
import loadingGif from '../searchloading.gif';

class DetailPage extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: 'undefined',
        }
    }
    
    componentDidMount() {
        axios.get('https://api.jikan.moe/v3/anime/' + this.props.match.params.anime_id)
        .then(response => {
            this.setState({
                bangumi: response.data,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.bangumi === 'undefined') {
            return (
                <div>
                    <Navibar history = {this.props.history}/>
                    <div className = {pageContainer}>
                        <div>
                            <Image className = {imageStyle} src={loadingGif} alt = 'loading'/>
                        </div>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <Navibar history = {this.props.history}/>
                <Information bangumi = {this.state.bangumi}/>
                <Synopsis bangumi = {this.state.bangumi}/>
            </div>
        )
    }
}

export default DetailPage;