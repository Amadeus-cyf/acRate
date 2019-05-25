import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image} from 'semantic-ui-react';
import Navibar from '../MainMenu/Navibar/navibar.jsx';
import {pageContainer, textStyle, imageStyle} from '../HomePage/homepage.module.scss';
import {bangumiSection, bangumiStyle, hoverPart, bangumiContainer, numberlistStyle, numberStyle} from './upcomingBangumi.module.scss';
import loadingGif from '../loading.gif';

class UpcomingBangumi extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: [], 
            currentBangumi: [],
            year: '',
            pageNumber: 0,
            currentPage: 1,
            currentPageStyle: {
                color: 'blue',
            },
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
        let year = date.getFullYear()+1;
        //get current season anime
        axios.get('https://api.jikan.moe/v3/season/later')
        .then(response => {
            if (response.data.anime.length > 30) {
                this.setState({
                    bangumi: response.data.anime,
                    currentBangumi: response.data.anime.slice(0, 30),
                    year: year,
                })
            } else {
                this.setState({
                    bangumi: response.data.anime,
                    currentBangumi: response.data.anime,
                    year: year,
                })
            }
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
        let currentBangumi = this.state.bangumi.slice((pageNumber-1)*30, pageNumber*30);
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        let currentBangumi = [];
        if (30*pageNumber <= this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(30*(pageNumber-1), 30*pageNumber);
        } else {
            currentBangumi = this.state.bangumi.slice(30*(pageNumber-1));
        }
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage+1;
        let currentBangumi = [];
        if (30*pageNumber <= this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(30*(pageNumber-1), 30*(pageNumber));
        } else {
            currentBangumi = this.state.bangumi.slice(30*(pageNumber-1));
        }
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    render() {
        if (this.state.bangumi.length === 0){
            return (
                <div>
                    <Navibar
                    toHomePage = {this.props.toHomePage}
                    loginHandler = {this.props.loginHandler}
                    signupHandler = {this.props.signupHandler}
                    logoutHandler = {this.props.logoutHandler}/>
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
            'max-width': '200px',
            'min-width': '200px',
            'height': 'auto',
            background: 'white',
        }
        let imgStyle = {
            'max-width': '175px',
            height: '250px',
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
        let currentBangumi = this.state.currentBangumi;
        // process each bangumi
        let currentList = currentBangumi.map(bangumi => {
            return(
                <Label style = {labelStyle}>
                    <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} />
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
                    <span className = {numberStyle} onClick = {this.toPage.bind(this, page)} style = {this.state.currentPageStyle}>{page}</span>
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
                        <h3>{this.state.year}年新番</h3>
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

export default UpcomingBangumi;