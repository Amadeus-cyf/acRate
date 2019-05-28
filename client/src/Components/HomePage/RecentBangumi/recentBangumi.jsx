import React, {Component} from 'react';
import axios from 'axios';
import {Image, Label} from 'semantic-ui-react';
import {pageContainer, textStyle, imageStyle} from '../homepage.module.scss';
import {bangumiSection, bangumiStyle, hoverPart, viewMoreStyle} from './recentBangumi.module.scss';
import loadingGif from '../../loading.gif';

class RecentBangumi extends Component {
    constructor() {
        super();
        this.state = {
            pastBangumi: [],
            bangumi: [],
            upcomingBangumi: [],
            year: '',
            month: '',
            pastYear: '',
            pastMonth: '',
            upcomingYear: '',
            upcomingMonth: '',
        }
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let pastYear = year;
        let upcomingYear = year;
        let month = date.getMonth() + 1;
        let season = 'winter';
        let past = '';
        let upcoming = '';
        if (month >= 1 && month < 4) {
            season = 'winter';
            if (month < 3) {
                past = 'fall';
                pastYear -= 1;
                this.setState({
                    year: year,
                    month: 1,
                    pastMonth: 10,
                    pastYear: pastYear,
                })
            } else {
                upcoming = 'spring';
                this.setState({
                    year: year,
                    month: 1,
                    upcomingYear: upcomingYear,
                    upcomingMonth: 4,
                })
            }
        } else if (month >= 4 && month < 7) {
            season = 'spring';
            if (month < 6) {
                past = 'winter';
                this.setState({
                    year: year,
                    month: 4,
                    pastMonth: 1,
                    pastYear: pastYear
                })
            } else {
                upcoming = 'summer';
                this.setState({
                    year: year,
                    month: 4,
                    upcomingYear: upcomingYear,
                    upcomingMonth: 7,
                })
            }
        } else if (month >= 7 && month < 10) {
            season = 'summer';
           if (month < 9) {
                past = 'spring';
                this.setState({
                    year: year,
                    month: 7,
                    pastMonth: 4,
                    pastYear: pastYear
                })
            } else {
                upcoming = 'fall';
                this.setState({
                    year: year,
                    month: 7,
                    upcomingYear: upcomingYear,
                    upcomingMonth: 10,
                })
            }
        } else if (month >= 10) {
            season = 'fall';
            if (month < 12) {
                past = 'summer';
                this.setState({
                    year: year,
                    month: 10,
                    pastMonth: 7,
                    pastYear: pastYear
                })
            } else {
                upcoming = 'winter';
                upcomingYear = year + 1;
                this.setState({
                    year: year,
                    month: 10,
                    upcomingYear: upcomingYear,
                    upcomingMonth: 1,
                })
            }
        }
        //get current season anime
        axios.get('api/bangumi/' + year + '/' + season)
        .then(response => {
            this.setState({
                bangumi: response.data.data.bangumiList,
            })
        }).catch(err => {
            alert(err);
        })
        //get upcoming season anime
        if (!past) {
            axios.get('api/bangumi/' + upcomingYear + '/' + upcoming)
            .then(response => {
                this.setState({
                    upcomingBangumi: response.data.data.bangumiList,
                })
            }).catch(err => {
                alert(err);
            })
        } else {
            // get previous season anime
            axios.get('api/bangumi/' + pastYear + '/' + past)
            .then(response => {
                this.setState({
                    pastBangumi: response.data.data.bangumiList,
                })
            }).catch(err => {
                alert(err);
            })
        }
    }

    render() {
        if (this.state.bangumi.length === 0) {
            return (
                <div>
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
                </div>
            )
        }
        let imgStyle = {
            'max-width': '175px',
            height: 'auto',
        }
        let labelStyle = {
            'max-width': '200px',
            'height': 'auto',
            background: 'white',
        }
        let listItems = [];
        if (this.state.upcomingBangumi.length === 0) {
            let pastBangumi = this.state.pastBangumi.slice(0, 18);
            listItems = pastBangumi.map(bangumi => {
                return(
                    <Label style = {labelStyle}>
                        <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} />
                        <p className = {hoverPart}>{bangumi.title}</p>
                    </Label>
                )
            })
        } else {
            if (this.state.upcomingBangumi.length > 18) {
                let upcomingBangumi = this.state.upcomingBangumi.slice(0, 18);
                listItems = upcomingBangumi.map(bangumi => {
                    return(
                        <Label style = {labelStyle}>
                            <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} />
                            <p className = {hoverPart}>{bangumi.title}</p>
                        </Label>
                    )
                })
            }
        }
        let bangumi = this.state.bangumi;
        if (this.state.bangumi.length > 18) {
            bangumi = this.state.bangumi.slice(0, 18);
        }
        let currentList = bangumi.map(bangumi => {
            return(
                <Label style = {labelStyle}>
                    <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} />
                    <p className = {hoverPart}>{bangumi.title}</p>
                </Label>
            )
        })
        if (this.state.upcomingBangumi.length === 0) {
            return (
                <div className = {bangumiSection}>
                    <h2>{this.state.year}年{this.state.month}月新番</h2>
                    <div className = {bangumiStyle}>
                        {currentList}
                    </div>
                    <span className = {viewMoreStyle} onClick = {this.props.currentViewMore}>View More</span>
                   <h2>{this.state.pastYear}年{this.state.pastMonth}月番</h2>
                   <div className = {bangumiStyle}>
                        {listItems}
                   </div>
                   <span className = {viewMoreStyle} onClick = {this.props.pastViewMore}>View More</span>
                </div>
            )
        } else {
            return (
                <div className = {bangumiSection}>
                    <h2>{this.state.year}年{this.state.month}月番</h2>
                    <div className = {bangumiStyle}>
                        {currentList}
                    </div>
                    <span className = {viewMoreStyle} onClick = {this.props.currentViewMore}>View More</span>
                   <h2>{this.state.upcomingYear}年{this.state.upcomingMonth}月新番</h2>
                   <div className = {bangumiStyle}>
                        {listItems}
                   </div>
                   <span className = {viewMoreStyle} onClick = {this.props.upcomingViewMore}>View More</span>
                </div>
            )
        }
    }
}

export default RecentBangumi;