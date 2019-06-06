import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Button} from 'semantic-ui-react';
import Navibar from '../Home/MainMenu/Navibar/navibar.jsx';
import {pageContainer, textStyle, imageStyle} from '../Home/AllBangumi/allBangumi.module.scss';
import loadingGif from '../loading.gif';
import {bangumiSection, bangumiStyle, hoverPart, 
    bangumiContainer, numberlistStyle} from './recentBangumi.module.scss';

class CurrentBangumi extends Component {
    constructor() {
        super();
        this.state = {
            currentBangumi: [],
            year: '',
            month: '',
            season: '',
            pageNumber: 0,
            currentPage: 1,
        }
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
    }

    componentDidMount() {
        let year = this.props.match.params.year;
        let season = this.props.match.params.season;
        let startMonth = 1;
        if (season === 'spring') {
            startMonth = 4;
        } else if (season === 'summer') {
            startMonth = 7;
        } else if (season === 'fall') {
            startMonth = 10;
        }
        //get current season anime
        axios.get('api/bangumi/' + year + '/' + season + '/' + this.state.currentPage)
        .then(response => {
            let animelist = response.data.data.bangumiList;
            this.setState({
                currentBangumi: animelist,
                year: year,
                month: startMonth,
                season: season,
            })
        }).catch(err => {
            alert(err);
        })
        //get number of anime total
        axios.get('api/bangumi/' + year + '/' + season + '/count')
        .then(response => {
            let bangumiNumber = response.data.data.bangumiNumber;
            if (bangumiNumber % 36) {
                this.setState({
                    pageNumber: (bangumiNumber - bangumiNumber%36)/36 + 1
                })
            } else {
                this.setState({
                    pageNumber: bangumiNumber/36,
                })
            }
        })
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    toPage(pageNumber) {
        let year = this.state.year;
        let season = this.state.season;
        this.setState({
            currentBangumi: [],
        })
        axios.get('api/bangumi/' + year + '/' + season + '/' + pageNumber)
        .then(response => {
            let animelist = response.data.data.bangumiList;
            this.setState({
                currentBangumi: animelist,
                currentPage: pageNumber,
            })
        }).catch(err => {
            alert(err);
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        let year = this.state.year;
        let season = this.state.season;
        this.setState({
            currentBangumi: [],
        })
        axios.get('api/bangumi/' + year + '/' + season + '/' + pageNumber)
        .then(response => {
            let animelist = response.data.data.bangumiList;
            this.setState({
                currentBangumi: animelist,
                currentPage: pageNumber,
            })
        }).catch(err => {
            alert(err);
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage+1;
        let year = this.state.year;
        let season = this.state.season;
        this.setState({
            currentBangumi: [],
        })
        axios.get('api/bangumi/' + year + '/' + season + '/' + pageNumber)
        .then(response => {
            let animelist = response.data.data.bangumiList;
            this.setState({
                currentBangumi: animelist,
                currentPage: pageNumber,
            })
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        if (this.state.currentBangumi.length === 0){
            return(
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
        // process each bangumi
        let currentBangumi = this.state.currentBangumi;
        let currentList = currentBangumi.map(bangumi => {
            let labelStyle = {
                'width': '200px',
                'height': 'auto',
                background: 'white',
            }
            let imgStyle = {
                width: '165px',
                height: '220px',
            }
            return(
                <Label onClick = {this.toDetailPage.bind(this, bangumi)} style = {labelStyle}>
                    <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} rounded/>
                    <p className = {hoverPart}>{bangumi.title}</p>
                </Label>
            )
        })
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
                <Navibar history = {this.props.history}/>
                <div className = {bangumiContainer}>
                    <div className = {bangumiSection}>
                        <h3>{this.state.year}年{this.state.month}月番</h3>
                        <div className = {bangumiStyle}>
                            {currentList}
                        </div>
                        <div className = {numberlistStyle} >
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

export default CurrentBangumi;