import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Button} from 'semantic-ui-react';
import Navibar from '../MainMenu/Navibar/navibar.jsx';
import {pageContainer, textStyle, imageStyle} from '../AllBangumi/allBangumi.module.scss';
import loadingGif from '../loading.gif';
import {bangumiSection, bangumiStyle, hoverPart, 
    bangumiContainer, numberlistStyle} from './currentBangumi.module.scss';

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
        this.toHomePage = this.toHomePage.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
    }

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let season = 'winter';
        if (month >= 1 && month < 4) {
            season = 'winter';
        } else if (month >= 4 && month < 7) {
            season = 'spring';
        } else if (month >= 7 && month < 10) {
            season = 'summer';
        } else if (month >= 10) {
            season = 'fall';
        }
        //get current season anime
        axios.get('api/bangumi/' + year + '/' + season + '/' + this.state.currentPage)
        .then(response => {
            let animelist = response.data.data.bangumiList;
            this.setState({
                currentBangumi: animelist,
                year: year,
                month: month,
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

    toHomePage() {
        this.props.history.push('/');
    }

    loginHandler() {
        this.props.history.push('/login');
    }

    signupHandler() {
        this.props.history.push('/signup');
    }

    logoutHandler() {
        this.props.history.push('/logout');
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
                    <Navibar
                    toHomePage = {this.toHomePage}
                    loginHandler = {this.loginHandler}
                    signupHandler = {this.signupHandler}
                    logoutHandler = {this.logoutHandler}/>
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
            'max-width': '170px',
            'min-width': '170px',
            'height': 'auto',
            background: 'white',
        }
        let imgStyle = {
            'max-width': '150px',
            'min-width': '150px',
            height: '200px',
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
                    <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} rounded/>
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
                <Navibar
                 toHomePage = {this.toHomePage}
                 loginHandler = {this.loginHandler}
                 signupHandler = {this.signupHandler}
                 logoutHandler = {this.logoutHandler}/>
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