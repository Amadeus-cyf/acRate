import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Button} from 'semantic-ui-react';
import MainMenu from '../MainMenu/mainMenu.jsx';
import Navibar from '../MainMenu/Navibar/navibar.jsx';
import {pageContainer,textStyle, imageStyle} from '../AllBangumi/allBangumi.module.scss';
import {bangumiSection, bangumiStyle, hoverPart, bangumiContainer, numberlistStyle} from './upcomingBangumi.module.scss';
import loadingGif from '../../loading.gif';

class UpcomingBangumi extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: [], 
            currentBangumi: [],
            year: '',
            pageNumber: 0,
            currentPage: 1,
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toUpcoming = this.toUpcoming.bind(this);
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
            let animelist = response.data.anime.filter(anime => {
                return !anime.r18 && !anime.kids;
            })
            if (animelist.length > 36) {
                this.setState({
                    bangumi: animelist,
                    currentBangumi: animelist.slice(0, 36),
                    year: year,
                })
            } else {
                this.setState({
                    bangumi: animelist,
                    currentBangumi: animelist,
                    year: year,
                })
            }
            if (animelist.length % 36) {
                this.setState({
                    pageNumber: (animelist.length-animelist.length%36)/36 + 1
                })
            } else {
                this.setState({
                    pageNumber: animelist.length/36,
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    toHomePage() {
        this.props.history.push('/');
    }

    toBangumi() {
        this.props.history.push('/bangumi');
    }

    toUpcoming() {
        this.props.history.push('/upcomingbangumi');
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
        let currentBangumi = this.state.bangumi.slice((pageNumber-1)*36, pageNumber*36);
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        let currentBangumi = [];
        if (36*pageNumber <= this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(36*(pageNumber-1), 36*pageNumber);
        } else {
            currentBangumi = this.state.bangumi.slice(36*(pageNumber-1));
        }
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage+1;
        let currentBangumi = [];
        if (36*pageNumber <= this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(36*(pageNumber-1), 36*(pageNumber));
        } else {
            currentBangumi = this.state.bangumi.slice(36*(pageNumber-1));
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
        let currentBangumi = this.state.currentBangumi;
        // process each bangumi
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
                    <Button onClick = {this.toPage.bind(this, page)} size = 'small' 
                    color = 'blue'>{page}</Button>
                )
            }
            return(
                <Button onClick = {this.toPage.bind(this, page)} size = 'small' 
                basic color = 'blue'>{page}</Button>
            )
        })
        return(
            <div>
                <MainMenu
                toHomePage = {this.toHomePage}
                loginHandler = {this.loginHandler}
                signupHandler = {this.signupHandler}
                logoutHandler = {this.logoutHandler}
                toBangumi = {this.toBangumi}
                toUpcoming = {this.toUpcoming}
                history = {this.props.history}/>
                <div className = {bangumiContainer}>
                    <div className = {bangumiSection}>
                        <h3>{this.state.year}年新番</h3>
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

export default UpcomingBangumi;