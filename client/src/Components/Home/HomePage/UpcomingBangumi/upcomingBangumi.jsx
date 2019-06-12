import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Button} from 'semantic-ui-react';
import {bangumiStyle, hoverPart} from './upcomingBangumi.module.scss';
import {pageContainer, textStyle, imageStyle} from '../../SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../../loading.gif';


class CurrentBangumi extends Component {
    constructor() {
        super();
        this.state = {
            upcomingBangumi: [],
            upcomingYear: '',
            upcomingMonth: '',
            season: '',
        }
        this.upcomingViewMore = this.upcomingViewMore.bind(this);
    }

    componentDidMount() {
        let date = new Date();
        let upcomingYear = date.getFullYear();
        let month = date.getMonth() + 1;
        let upcoming = '';
        if (month >= 1 && month < 4) {
            upcoming = 'spring';
            this.setState({
                upcomingYear: upcomingYear,
                upcomingMonth: 4,
                season: upcoming,
            })
        } else if (month >= 4 && month < 7) {
            upcoming = 'summer';
            this.setState({
                upcomingYear: upcomingYear,
                upcomingMonth: 7,
                season: upcoming,
            })
        } else if (month >= 7 && month < 10) {
            upcoming = 'fall'
            this.setState({
                upcomingYear: upcomingYear,
                upcomingMonth: 10,
                season: upcoming,
            })
        } else if (month >= 10) {
            upcoming = 'winter';
            upcomingYear += 1;
            this.setState({
                upcomingYear: upcomingYear,
                upcomingMonth: 1,
                season: upcoming,
            })
        }
        //get upcoming season anime
        axios.get('https://api.jikan.moe/v3/season/' + upcomingYear + '/' + upcoming)
        .then(response => {
            this.setState({
                upcomingBangumi: response.data.anime,
            })
        }).catch(err => {
            alert(err);
        })
    }

    upcomingViewMore() {
        this.props.history.push('/bangumi/' + this.state.upcomingYear + '/' + this.state.season);
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.mal_id);
    }

    render() {
        if (this.state.upcomingBangumi.length === 0) {
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
        let bangumi = this.state.upcomingBangumi;
        let upcomingList = bangumi.map(bangumi => {
            let labelStyle = {
                width: '170px',
                height: 'auto',
                background: 'white',
            }
            let imgStyle = {
                width: '150px',
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
                <h2>{this.state.year}年{this.state.month}月番</h2>
                <div className = {bangumiStyle}>
                        {upcomingList}
                </div>
                <Button size = 'tiny' color = 'blue' onClick = {this.upcomingViewMore}>View More</Button>
            </div>
        )
    }
}

export default CurrentBangumi;