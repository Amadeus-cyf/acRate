import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image} from 'semantic-ui-react';
import Navibar from '../MainMenu/Navibar/navibar.jsx';
import {bangumiSection, bangumiStyle, hoverPart, bangumiContainer, numberlistStyle, numberStyle} from './currentBangumi.module.scss';

class CurrentBangumi extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: [], 
            year: '',
            month: '',
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
        axios.get('https://api.jikan.moe/v3/season/' + year + '/' + season)
        .then(response => {
            this.setState({
                bangumi: response.data.anime,
                year: year,
                month: month,
            })
            if (response.data.anime.length % 30) {
                this.setState({
                    pageNumber: (response.data.anime.length-response.data.anime.length%30)/30 + 1
                })
            } else {
                this.setState({
                    pageNumber: response.data.anime.length/30,
                })
            }
        }).catch(err => {
            alert(err);
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
        this.setState({
            currentPage: pageNumber,
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        this.setState({
            currentPage: pageNumber,
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage+1;
        this.setState({
            currentPage: pageNumber,
        })
    }

    render() {
        let labelStyle = {
            'max-width': '200px',
            'min-width': '200px',
            'height': 'auto',
            background: 'white',
        }
        let imageStyle = {
            'max-width': '175px',
            height: '250px',
        }
        let currentPageStyle = {
            color: 'blue',
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
        let currentBangumi = [];
        if (30*(this.state.currentPage) <= this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(30*(this.state.currentPage-1), 30*(this.state.currentPage));
        } else {
            currentBangumi = this.state.bangumi.slice(30*(this.state.currentPage-1));
        }
        // process each bangumi
        let currentList = currentBangumi.map(bangumi => {
            return(
                <Label style = {labelStyle}>
                    <Image className = {hoverPart} style = {imageStyle} src = {bangumi.image_url} />
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
                    <span className = {numberStyle} onClick = {this.toPage.bind(this, page)} style = {currentPageStyle}>{page}</span>
                )
            }
            return(
                <span className = {numberStyle} onClick = {this.toPage.bind(this, page)}>{page}</span>
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
                            <p>Page</p>
                            <p className = {numberStyle} style = {previousStyle} onClick = {this.toPrevious}>Prev</p>
                            {pageList}
                            <p className = {numberStyle} style = {nextStyle} onClick = {this.toNext}>Next</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CurrentBangumi;