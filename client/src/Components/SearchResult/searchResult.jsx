import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Button, Form, Input} from 'semantic-ui-react';
import Navibar from '../Home/MainMenu/Navibar/navibar.jsx';
import {searchResultStyle, wordStyle, 
    imageHoverStyle, titleStyle, numberStyle, numberlistStyle} from './searchResult.module.scss';
import {textStyle, imageStyle, pageContainer} from '../Home/AllBangumi/allBangumi.module.scss';
import loadingGif from '../searchloading.gif';

class SearchResult extends Component {
    constructor() {
        super();
        this.state = {
            result: 'undefined',
            currentBangumi: [],
            pageNumber: 0,
            currentPage: 1,
            inputPage: '',
            bangumiNumber: 0,
        }
        this.toHomePage = this.toHomePage.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.toPage = this.toPage.bind(this);
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
    }

    componentDidMount() {
        axios.get('api/bangumiList/search/' + this.props.match.params.keyword)
        .then(response => {
            let bangumiNumber = response.data.data.bangumiList.length;
            this.setState({
                result: response.data.data.bangumiList,
                currentBangumi: response.data.data.bangumiList.slice(0, 10),
                bangumiNumber: bangumiNumber,
            })
            if (bangumiNumber % 10) {
                this.setState({
                    pageNumber: (bangumiNumber - bangumiNumber%10)/10 + 1
                })
            } else {
                this.setState({
                    pageNumber: bangumiNumber/10,
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

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    toPage(pageNumber) {
        if (pageNumber === '') {
            return;
        }
        let result = this.state.result;
        this.setState({
            currentBangumi: result.slice((pageNumber-1)*10, pageNumber*10),
            currentPage: pageNumber,
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        let result = this.state.result;
        this.setState({
            currentBangumi: result.slice((pageNumber-1)*10, pageNumber*10),
            currentPage: pageNumber,
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage+1;
        let result = this.state.result;
        this.setState({
            currentBangumi: result.slice((pageNumber-1)*10, pageNumber*10),
            currentPage: pageNumber,
        })
    }

    pageHandler(event) {
        for (let i = 0; i < event.target.value.length; i++) {
            if (isNaN(parseInt(event.target.value[i]))) {
                this.setState({
                    inputPage: '',
                });
                return;
            }
        }
        if (event.target.value > this.state.pageNumber || event.target.value < 1) {
            this.setState({
                inputPage: '',
            });
            return;
        }
        this.setState({
            inputPage: parseInt(event.target.value),
        })
    }

    render() {
        if (this.state.result === 'undefined') {
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
        if (this.state.result.length === 0) {
            return <p>Not found</p>
        }
        let labelStyle = {
            background: 'white',
            'display': 'flex',
            'padding-top': '2%'
        }
        let imgStyle = {
            'max-width': '180px',
            'min-width': '180px',
            'max-height': '250px',
            'min-height': '250px',
        }
        let bangumiLabels = this.state.currentBangumi.map(bangumi => {
            let intro = '';
            if (bangumi.synopsis.length > 120) {
                intro = bangumi.synopsis.slice(0, 120).concat('...');
            } else {
                intro = bangumi.synopsis;
            }
            return (
                <Label style = {labelStyle} onClick = {this.toDetailPage.bind(this, bangumi)}>
                    <Image className = {imageHoverStyle} style = {imgStyle} src = {bangumi.image_url} alt = 'search result' rounded/>
                    <div className = {wordStyle}>
                        <p className = {titleStyle}>{bangumi.title}</p>
                        <p>Date: {bangumi.airing_start}</p>
                        <p>Introduction: {intro}</p>
                    </div>
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
        let pageList = [];
        // process number list
        if (this.state.pageNumber <= 10) {
            pageList = pageArr.map(page => {
                if (page === this.state.currentPage) {
                    return(
                        <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                    )
                }
                return(
                    <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
                )
            })
        } else {
            pageList = pageArr.map(page => {
                if (page === 1) {
                    if (this.state.currentPage === 1) {
                        return(
                            <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                        )
                    } else {
                        return(
                            <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
                        )
                    }
                }
                if (page === this.state.pageNumber) {
                    if (this.state.currentPage === this.state.pageNumber) {
                        return(
                            <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                        )
                    } else {
                        return(
                            <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
                        )
                    }
                }
                if (this.state.currentPage > 2 && this.state.currentPage <= this.state.pageNumber-2) {
                    if (page >= this.state.currentPage - 2 && page <= (this.state.currentPage + 2)) {
                        if (page === this.state.currentPage) {
                            return(
                                <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                            )
                        }
                        return(
                            <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
                        ) 
                    } else {
                        if (page === this.state.currentPage - 3 || page === this.state.currentPage + 3) {
                            return(
                                <span className = {numberStyle}>...</span>
                            )
                        }
                    }
                } else if (this.state.currentPage <= 2) {
                    if (page <= 5) {
                        if (page === this.state.currentPage) {
                            return(
                                <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                            )
                        }
                        return(
                            <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
                        ) 
                    } else {
                        if (page === 6) {
                            return(
                                <p className = {numberStyle}>...</p>
                            )
                        }
                    }
                } else {
                    if (page > this.state.pageNumber - 5) {
                        if (page === this.state.currentPage) {
                            return(
                                <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                            )
                        }
                        return(
                            <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
                        ) 
                    } else {
                        if (page === this.state.pageNumber - 5) {
                            return(
                                <p className = {numberStyle}>...</p>
                            )
                        }
                    }
                }
                return '';
            })
        }

        return(
            <div>
                <Navibar
                toHomePage = {this.toHomePage}
                loginHandler = {this.loginHandler}
                signupHandler = {this.signupHandler}
                logoutHandler = {this.logoutHandler}/>
                <div className = {searchResultStyle}>
                    {bangumiLabels}
                    <div className = {numberlistStyle} >
                        <Button color = 'blue' onClick = {this.toPage.bind(this, 1)}>Page</Button>
                        <Button basic color = 'blue' style = {previousStyle} onClick = {this.toPrevious}>Prev</Button>
                        {pageList}
                        <Button basic color = 'blue' style = {nextStyle} onClick = {this.toNext}>Next</Button>
                        <Form onSubmit = {this.toPage.bind(this, this.state.inputPage)}>
                            <Input placeholder = 'Enter page number'onChange = {this.pageHandler}></Input>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResult;