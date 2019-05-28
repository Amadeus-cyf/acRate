import React, {Component} from 'react';
import axios from 'axios';
import MainMenu from '../MainMenu/mainMenu.jsx';
import Navibar from '../MainMenu/Navibar/navibar.jsx';
import {pageContainer,textStyle, imageStyle} from '../HomePage/homepage.module.scss';
import {Label, Image, Button} from 'semantic-ui-react';
import Select from 'react-select';
import loadingGif from '../loading.gif';
import {pageStyle, bangumiSection, bangumiStyle, 
    hoverPart, numberlistStyle, numberStyle, selectStyle, selectCss} from './allBangumi.module.scss';

class Bangumi extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: [], 
            currentBangumi: [],
            selectYear: {},
            displayYear: '',
            selectSeason: {},
            month: '',
            pageNumber: 0,
            currentPage: 1,
            yearOptions: [],
            currentPageStyle: {
                color: 'blue',
            },
            seasonOptions: [
                {
                    label: 1,
                    value: 'winter',
                },
                {
                    label: 4,
                    value: 'spring',
                },
                {
                    label: 7,
                    value: 'summer',
                },
                {
                    label: 10,
                    value: 'fall',
                },
                {
                    label: 'All year',
                    value: 'allyear',
                }
            ]
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.toBangumi = this.toBangumi.bind(this);
        this.toUpcoming = this.toUpcoming.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
        this.yearHandler = this.yearHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.seasonHandler = this.seasonHandler.bind(this);
    }

    componentDidMount() {
        let year = 2018;
        let month = 1;
        let season = 'winter';
        //get default season anime
        axios.get('api/bangumi/' + year + '/' + season)
        .then(response => {
            let animelist = response.data.data.bangumiList
            if (animelist.length > 30) {
                this.setState({
                    bangumi: animelist,
                    currentBangumi: animelist.slice(0, 30),
                    displayYear: year,
                    month: month,
                })
            } else {
                this.setState({
                    bangumi: animelist,
                    currentBangumi: animelist,
                    displayYear: year,
                    month: month,
                })
            }
            if (animelist.length % 30) {
                this.setState({
                    pageNumber: (animelist.length-animelist.length%30)/30 + 1
                })
            } else {
                this.setState({
                    pageNumber: animelist.length/30,
                })
            }
        }).catch(err => {
            alert(err);
        })
        let date = new Date();
        let yearList = [];
        for (let i = date.getFullYear(); i >= 2010; i--) {
            let currYear = {
                label: i,
                value: i,
            };
            yearList.push(currYear);
        }
        this.setState({
            yearOptions: yearList,
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
        let currentBangumi = this.state.bangumi.slice((pageNumber-1)*30, pageNumber*30);
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        let currentBangumi = [];
        if (30*pageNumber < this.state.bangumi.length) {
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
        if (30*pageNumber < this.state.bangumi.length) {
            currentBangumi = this.state.bangumi.slice(30*(pageNumber-1), 30*pageNumber);
        } else {
            currentBangumi = this.state.bangumi.slice(30*(pageNumber-1));
        }
        this.setState({
            currentPage: pageNumber,
            currentBangumi: currentBangumi,
        })
    }

    yearHandler(selectYear) {
        this.setState({
            selectYear: selectYear,
        })
    }

    seasonHandler(selectSeason) {
        this.setState({
            selectSeason: selectSeason,
        })
    }

    submitHandler() {
        if (this.state.selectYear.value === undefined) {
            alert('Please select a year');
            return;
        }
        if (this.state.selectSeason.value === undefined) {
            alert('Please select a season');
            return;
        }
        let year = this.state.selectYear.value;
        let season = this.state.selectSeason.value;
        let month = this.state.selectSeason.label;
        let date = new Date();
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth()+1;
        this.setState({
            bangumi: [],
            selectYear: {},
            selectSeason: {},
        })
        // upcoming bangumi
        if (year === currentYear && month >= currentMonth) {
            axios.get('https://api.jikan.moe/v3/season/' + year + '/' + season)
            .then(response => {
                let animelist = response.data.anime.filter(anime => {
                    return !anime.r18&&!anime.kids;
                })
                if (animelist.length > 30) {
                    this.setState({
                        bangumi: animelist,
                        currentBangumi: animelist.slice(0, 30),
                        displayYear: year,
                        month: month,
                        currentPage: 1,
                    })
                } else {
                    this.setState({
                        bangumi: animelist,
                        currentBangumi: animelist,
                        displayYear: year,
                        month: month,
                        currentPage: 1,
                        selectYear: {},
                        selectSeason: {},
                    })
                }
                if (animelist.length % 30) {
                    this.setState({
                        pageNumber: (animelist.length-animelist.length%30)/30 + 1
                    })
                } else {
                    this.setState({
                        pageNumber: animelist.length/30,
                    })
                }
            }).catch(err => {
                alert(err);
            })
        } else {
            // current and past bangumi
            axios.get('api/bangumi/' + year + '/' + season)
            .then(response => {
                let animelist = response.data.data.bangumiList;
                if (animelist.length > 30) {
                    this.setState({
                        bangumi: animelist,
                        currentBangumi: animelist.slice(0, 30),
                        displayYear: year,
                        month: month,
                        currentPage: 1,
                    })
                } else {
                    this.setState({
                        bangumi: animelist,
                        currentBangumi: animelist,
                        displayYear: year,
                        month: month,
                        currentPage: 1,
                    })
                }
                if (animelist.length % 30) {
                    this.setState({
                        pageNumber: (animelist.length-animelist.length%30)/30 + 1
                    })
                } else {
                    this.setState({
                        pageNumber: animelist.length/30,
                    })
                }
            }).catch(err => {
                alert(err);
            })
        }
    }

    render() {
        if (this.state.displayYear === ''  || this.state.bangumi.length === 0) {
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
        let titleStyle = {
            display: 'block',
        }
        if (this.state.month === 'All year') {
            titleStyle = {
                display: 'none',
            }
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
                 <MainMenu
                toHomePage = {this.toHomePage}
                loginHandler = {this.loginHandler}
                signupHandler = {this.signupHandler}
                logoutHandler = {this.logoutHandler}
                toBangumi = {this.toBangumi}
                toUpcoming = {this.toUpcoming}/>
                <div className = {pageStyle}>
                    <div className = {selectStyle}>
                        <Select className = {selectCss} placeholder="Select a Year" onChange = {this.yearHandler} options={this.state.yearOptions}/>
                        <Select placeholder='Select a Season' className = {selectCss} onChange = {this.seasonHandler} options={this.state.seasonOptions}/>
                        <Button onClick = {this.submitHandler}>Search</Button>
                    </div>
                    <div>
                        <div className = {bangumiSection}>
                            <h3>{this.state.displayYear}年</h3>
                            <h3 style = {titleStyle}>{this.state.month}月</h3>
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
            </div>
        )
    }
}

export default Bangumi;