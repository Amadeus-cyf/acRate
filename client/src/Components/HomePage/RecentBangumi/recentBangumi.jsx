import React, {Component} from 'react';
import axios from 'axios';
import {Image, Label} from 'semantic-ui-react';
import {bangumiSection, bangumiStyle, hoverPart, viewMoreStyle} from './recentBangumi.module.scss';

class RecentBangumi extends Component {
    constructor() {
        super();
        this.state = {
            pastBangumi: [],
            bangumi: [],
            upcomingBangumi: [],
            date: new Date(),
            pastYear: '',
            pastMonth: '',
        }
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let pastYear = year;
        let month = date.getMonth();
        let season = 'winter';
        let past = 'fall';
        if (month >= 1 && month < 4) {
            season = 'winter';
            if (month < 3) {
                past = 'fall';
                pastYear -= 1;
                alert(pastYear)
                this.setState({
                    pastMonth: 10,
                    pastYear: pastYear
                })
            }
        } else if (month >= 4 && month < 7) {
            season = 'spring';
            if (month < 6) {
                past = 'winter';
                this.setState({
                    pastMonth: 1,
                    pastYear: pastYear
                })
            }
        } else if (month >= 7 && month < 10) {
            season = 'summer';
           if (month < 9) {
                past = 'spring';
                this.setState({
                    pastMonth: 4,
                    pastYear: pastYear
                })
            }
        } else if (month >= 10) {
            season = 'fall';
            if (month < 12) {
                past = 'summer';
                this.setState({
                    pastMonth: 7,
                    pastYear: pastYear
                })
            }
        }
        //get current season anime
        axios.get('https://api.jikan.moe/v3/season/' + year + '/' + season)
        .then(response => {
            this.setState({
                bangumi: response.data.anime,
            })
        }).catch(err => {
            alert(err);
        })
        //get upcoming season anime
        if (!past) {
            axios.get('https://api.jikan.moe/v3/season/later')
            .then(response => {
                this.setState({
                    upcomingBangumi: response.data.anime,
                })
            }).catch(err => {
                alert(err);
            })
        } else {
            // get previous season anime
            axios.get('https://api.jikan.moe/v3/season/' + pastYear + '/' + past)
            .then(response => {
                this.setState({
                    pastBangumi: response.data.anime,
                })
            }).catch(err => {
                alert(err);
            })
        }
    }

    render() {
        if (this.state.bangumi.length === 0) {
            return <div></div>
        }
        let imageStyle = {
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
            let pastBangumi = this.state.pastBangumi.slice(0, 20);
            listItems = pastBangumi.map(bangumi => {
                return(
                    <Label style = {labelStyle}>
                        <Image className = {hoverPart} style = {imageStyle} src = {bangumi.image_url} />
                        <p className = {hoverPart}>{bangumi.title}</p>
                    </Label>
                )
            })
        } else {
            let upcomingBangumi = this.state.upcomingBangumi.slice(0, 20);
            listItems = upcomingBangumi.map(bangumi => {
                return(
                    <Label style = {labelStyle}>
                        <Image className = {hoverPart} style = {imageStyle} src = {bangumi.image_url} />
                        <p className = {hoverPart}>{bangumi.title}</p>
                    </Label>
                )
            })
        }
        let bangumi = this.state.bangumi.slice(0, 20);
        let currentList = bangumi.map(bangumi => {
            return(
                <Label style = {labelStyle}>
                    <Image className = {hoverPart} style = {imageStyle} src = {bangumi.image_url} />
                    <p className = {hoverPart}>{bangumi.title}</p>
                </Label>
            )
        })
        if (this.state.upcomingBangumi.length === 0) {
            return (
                <div className = {bangumiSection}>
                    <h2>{this.state.date.getFullYear()}年{this.state.date.getMonth()}月新番</h2>
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
                    <h2>{this.state.date.getFullYear()}年{this.state.date.getMonth()}月番</h2>
                    <div className = {bangumiStyle}>
                        {currentList}
                    </div>
                    <span className = {viewMoreStyle} onClick = {this.props.currentViewMore}>View More</span>
                   <h2>{this.state.pastYear}年{this.state.pastMonth}月新番</h2>
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