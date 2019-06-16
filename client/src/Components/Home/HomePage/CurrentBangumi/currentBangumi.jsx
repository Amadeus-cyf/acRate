import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Button} from 'semantic-ui-react';
import {bangumiStyle, hoverPart} from './currentBangumi.module.scss';
import {pageContainer, textStyle, imageStyle} from '../../SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../../loading.gif';

class CurrentBangumi extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: [],
            year: '',
            month: '',
            season: '',
        }
        this.currentViewMore = this.currentViewMore.bind(this);
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let season = 'winter';
        if (month >= 1 && month < 4) {
            season = 'winter';
            this.setState({
                year: year,
                month: 1,
                season: season,
            })
        } else if (month >= 4 && month < 7) {
            season = 'spring';
            this.setState({
                year: year,
                month: 4,
                season: season,
            })
        } else if (month >= 7 && month < 10) {
            season = 'summer';
            this.setState({
                year: year,
                month: 7,
                season: season,
            })
        } else if (month >= 10) {
            season = 'fall';
            this.setState({
                year: year,
                month: 10,
                season: season,
            })
        }
        //get current season anime
        axios.get('api/bangumi/' + year + '/' + season + '/limit')
        .then(response => {
            this.setState({
                bangumi: response.data.data.bangumiList,
            })
        }).catch(err => {
            alert(err);
        })
    }

    currentViewMore() {
        this.props.history.push('/bangumi/' + this.state.year + '/' + this.state.season);
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    render() {
        if (this.state.bangumi.length === 0) {
            return (
                <div>
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
        let bangumi = this.state.bangumi;
        let currentList = bangumi.map(bangumi => {
            let labelStyle = {
                width: '200px',
                height: 'auto',
                background: 'white',
            }
            let imgStyle = {
                width: '160px',
                height: '200px',
            }
            return(
                <Label onClick ={this.toDetailPage.bind(this, bangumi)} style = {labelStyle}>
                    <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} rounded/>
                    <p className = {hoverPart}>{bangumi.title}</p>
                </Label>
            )
        })
        return(
            <div>
                <h2>{this.state.year}年{this.state.month}月新番</h2>
                <div className = {bangumiStyle}>
                        {currentList}
                </div>
                <Button size = 'tiny' color = 'blue' onClick = {this.currentViewMore}>View More</Button>
            </div>
        )
    }
}

export default CurrentBangumi;