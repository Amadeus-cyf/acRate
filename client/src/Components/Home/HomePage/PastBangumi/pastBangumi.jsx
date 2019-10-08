import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {Label, Image, Button} from 'semantic-ui-react';
import {bangumiStyle, hoverPart, titleStyle} from './pastBangumi.module.scss';
import {pageContainer, textStyle, imageStyle} from '../../SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../../loading.gif';

class PastBangumi extends Component {
    constructor() {
        super();
        this.state = {
            pastBangumi: [],
            pastMonth: '',
            pastYear: '',
            pastSeason: '',
            month: '',
        }
        this.pastViewMore = this.pastViewMore.bind(this);
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let pastYear = year;
        //let season = 'winter';
        let past = ''
        if (month >= 1 && month < 4) {
            past = 'fall';
            pastYear -= 1;
            this.setState({
                pastMonth: 10,
                pastYear: pastYear,
                pastSeason: past,
            })
        } else if (month >= 4 && month < 7) {
            past = 'winter';
            this.setState({
                pastMonth: 1,
                pastYear: pastYear,
                pastSeason: past,
            })
        } else if (month >= 7 && month < 10) {
            past = 'spring';
            this.setState({
                pastMonth: 4,
                pastYear: pastYear,
                pastSeason: past,
            })
        } else if (month >= 10) {
            past = 'summer';
            this.setState({
                pastMonth: 7,
                pastYear: pastYear,
                pastSeason: past,
            })
        }
        // get previous season anime
        axios.get('api/bangumi/' + pastYear + '/' + past + '/limit')
        .then(response => {
            this.setState({
                pastBangumi: response.data.data.bangumiList,
            })
        }).catch(err => {
            alert(err);
        })
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    pastViewMore() {
        this.props.history.push('/bangumi/' + this.state.pastYear + '/' + this.state.pastSeason);
    }

    render() {
        if (this.state.pastBangumi.length === 0) {
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
        let pastBangumi = this.state.pastBangumi;
        let pastList = pastBangumi.map(bangumi => {
            let labelStyle = {
                width: '160px',
                height: 'auto',
                background: 'white',
            }
            let imgStyle = {
                width: '160px',
                height: '190px',
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
                <h2 className = {titleStyle} onClick = {this.pastViewMore}>
                {this.state.pastYear}年{this.state.pastMonth}月番</h2>
                <div className = {bangumiStyle}>
                    {pastList}
                </div>
                <Button size = 'tiny' color = 'blue' onClick = {this.pastViewMore}>View More</Button>
            </div>
        )
    }
}

export default withRouter(PastBangumi);