import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Button} from 'semantic-ui-react';
import Navibar from '../Home/MainMenu/Navibar/navibar.jsx';
import {pageContainer,textStyle, imageStyle} from '../Home/SeasonBangumi/seasonBangumi.module.scss';
import {bangumiSection, bangumiStyle, hoverPart, 
    bangumiContainer} from './newBangumi.module.scss';
import loadingGif from '../loading.gif';

class NewBangumi extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: [], 
            currentBangumi: [],
            year: '',
            month: '',
            pageNumber: 0,
            currentPage: 1,
            currentPageStyle: {
                color: 'blue',
            },
        }
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let upcomingSeason = 'winter';
        let upcomingMonth = month;
        if (month >= 1 && month < 4) {
            upcomingSeason = 'spring';
            upcomingMonth = 4;
        } else if (month >= 4 && month < 7) {
            upcomingSeason = 'summer';
            upcomingMonth = 7;
        } else if (month >= 7 && month < 10) {
            upcomingSeason = 'fall';
            upcomingMonth = 10;
        } else if (month >= 10) {
            upcomingSeason = 'winter';
            upcomingMonth = 1;
        }
        //get current season anime
        axios.get('https://api.jikan.moe/v3/season/' + year + '/' + upcomingSeason)
        .then(response => {
            let animelist = response.data.anime.filter(anime => {
                return !anime.r18 && !anime.kids;
            })
            this.setState({
                bangumi: animelist,
                currentBangumi: animelist.slice(0, 20),
                year: year,
                month: upcomingMonth,
            })
            if (animelist.length % 20) {
                this.setState({
                    pageNumber: (animelist.length - animelist.length%20)/20 + 1
                })
            } else {
                this.setState({
                    pageNumber: animelist.length/20,
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    toPage(pageNumber) {
        let currentBangumi = this.state.bangumi.slice((pageNumber-1)*20, pageNumber*20);
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        let currentBangumi = [];
        if (20*pageNumber <= this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(20*(pageNumber-1), 20*pageNumber);
        } else {
            currentBangumi = this.state.bangumi.slice(20*(pageNumber-1));
        }
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage+1;
        let currentBangumi = [];
        if (20*pageNumber <= this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(20*(pageNumber-1), 20*(pageNumber));
        } else {
            currentBangumi = this.state.bangumi.slice(20*(pageNumber-1));
        }
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.mal_id)
    }

    render() {
        if (this.state.bangumi.length === 0) {
            return (
                <div>
                    <Navibar/>
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
        let labelStyle = {
            width: '200px',
            height: 'auto',
            background: 'white',
        }
        let imgStyle = {
            width: '160px',
            height: '210px',
        }
        let previousStyle = {
            display: 'inline',
        }
        let nextStyle = {
            display: 'inline',
        }
        if (this.state.currentPage === 1) {
            previousStyle = {
                display: 'none',
            }
        }
        if (this.state.currentPage === this.state.pageNumber) {
            nextStyle = {
                display: 'none',
            }
        }
        // process each bangumi
        let currentBangumi = this.state.currentBangumi;
        let currentList = currentBangumi.map(bangumi => {
            return(
                <Label style = {labelStyle}>
                    <Image onClick = {this.toDetailPage.bind(this, bangumi)}  
                    className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} rounded/>
                    <p className = {hoverPart}>{bangumi.title}</p>
                </Label>
            )
        })
        // set page number list 
        let pageArr = [];
        for (let i = 0; i < this.state.pageNumber; i++) {
            pageArr.push(i+1);
        }
        let pageList = pageArr.map(page => {
            if (page === this.state.currentPage) {
                return(
                    <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                )
            }
            return(
                <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
            )
        })
        return(
            <div>
                <Navibar/>
                <div className = {bangumiContainer}>
                    <div className = {bangumiSection}>
                        <h3>{this.state.year}年{this.state.month}月番</h3>
                        <div className = {bangumiStyle}>
                            {currentList}
                        </div>
                        <div style = {{marginTop: '20px'}}>
                            <Button color = 'blue' onClick = {this.toPage.bind(this, 1)}>Page</Button>
                            <Button basic color = 'blue' style = {previousStyle} onClick = {this.toPrevious}>Prev</Button>
                            {pageList}
                            <Button basic color = 'blue' style = {nextStyle} onClick = {this.toNext}>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewBangumi;