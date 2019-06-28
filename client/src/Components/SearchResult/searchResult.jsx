import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Button, Form, Input, Divider} from 'semantic-ui-react';
import Navibar from '../Home/MainMenu/Navibar/navibar.jsx';
import Searchbar from './Searchbar/searchbar.jsx';
import {textStyle, imageStyle, pageContainer} from '../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../searchloading.gif';
import {searchResultStyle, wordStyle, imageHoverStyle, titleStyle, 
    numberlistStyle, headStyle, footerStyle, noTitleStyle} from './searchResult.module.scss';
import notFoundImage from './404.jpg';

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
                currentBangumi: response.data.data.bangumiList.slice(0, 20),
                bangumiNumber: bangumiNumber,
            })
            if (bangumiNumber % 20) {
                this.setState({
                    pageNumber: (bangumiNumber - bangumiNumber%20)/20 + 1
                })
            } else {
                this.setState({
                    pageNumber: bangumiNumber/20,
                })
            }
        }).catch(err => {
            alert(err);
        })
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
            currentBangumi: result.slice((pageNumber-1)*20, pageNumber*20),
            currentPage: pageNumber,
        })
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        let result = this.state.result;
        this.setState({
            currentBangumi: result.slice((pageNumber-1)*20, pageNumber*20),
            currentPage: pageNumber,
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage+1;
        let result = this.state.result;
        this.setState({
            currentBangumi: result.slice((pageNumber-1)*20, pageNumber*20),
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
        if (this.state.result.length === 0) {
            return (
                <div style = {{background: 'white', height: '100vh'}}>
                    <Navibar/>
                    <Searchbar/>
                    <h2 className = {noTitleStyle}>No bangumi found</h2>
                    <Image size = 'medium' style = {{display: 'block', 
                    margin: '0 auto'}}src = {notFoundImage}/>
                </div>
            )
        }
        let currentBangumi = this.state.currentBangumi.sort((first, second) => {
            if (first.airing_start > second.airing_start) {
                return -1;
            } else if (first.airing_start < second.airing_start) {
                return 1;
            } else {
                return 0;
            }
        })
        let bangumiLabels = currentBangumi.map(bangumi => {
            let intro = '';
            if (bangumi.synopsis.length > 200) {
                intro = bangumi.synopsis.slice(0, 200).concat('...');
            } else {
                intro = bangumi.synopsis;
            }
            let labelStyle = {
                background: 'white',
                'display': 'flex',
                'padding-top': '30px',
                'font-family': "'PT Sans Caption', sans-serif",
            }
            let imgStyle = {
                width: '165px',
                height: '225px',
            }
            let upperStyle = {};
            let scoreStyle = {
                display: 'none',
            }
            if (bangumi.userNumber > 0) {
                scoreStyle = {
                    display: 'inline',
                    'padding-left': '10px',
                }
                upperStyle = {
                   'display': 'flex',
                   'justify-content': 'space-between',
                }
            }
            let date = new Date(bangumi.airing_start);
            return (
                <Label style = {labelStyle}>
                    <Image onClick = {this.toDetailPage.bind(this, bangumi)} className = {imageHoverStyle} 
                    style = {imgStyle} src = {bangumi.image_url} alt = 'search result' rounded/>
                    <div className = {wordStyle}>
                        <div style = {upperStyle}>
                            <p onClick = {this.toDetailPage.bind(this, bangumi)} className = {titleStyle}>
                                {bangumi.title}
                            </p>
                            <div style = {scoreStyle}>
                                <h2 style = {{textAlign: 'center', 
                                fontSize: '24pt', color: 'rgba(255, 180, 0, 1)'}}>
                                    {bangumi.score.toFixed(1)}
                                    <p style = {{'font-size': '10pt', color: 'rgba(100, 100, 100, 0.5)'}}>
                                        {bangumi.userNumber} users scored
                                     </p>
                                </h2>
                            </div>
                        </div>
                        <p>Date: {date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</p>
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
        let listStyle = {
            display: 'flex',
        }
        if (this.state.pageNumber === 1) {
            listStyle = {
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
        // set page number list 
        let pageArr = [];
        for (let i = 0; i < this.state.pageNumber; i++) {
            pageArr.push(i+1);
        }
        let pageList = [];
        // process number list
        pageList = pageArr.map(page => {
            if (page === this.state.currentPage) {
                return(
                    <Button onClick = {this.toPage.bind(this, page)} 
                    size = 'small' color = 'blue'>{page}</Button>
                )
            }
            return(
                <Button onClick = {this.toPage.bind(this, page)} 
                size = 'small' basic color = 'blue'>{page}</Button>
            )
        })
        let dividerStyle = {
            display: 'block',
            margin: '0 auto',
            width: '70%',
        }
        return(
            <div style = {{background: 'white'}}>
                <Navibar/>
                <Searchbar/>
                <Divider style = {dividerStyle}/>
                <div className = {searchResultStyle}>
                    <h2 className = {headStyle}> {this.state.result.length} 
                    search result(s) for "{this.props.match.params.keyword}"</h2>
                    {bangumiLabels}
                    <div className = {numberlistStyle} style = {listStyle}>
                        <Button color = 'blue' onClick = {this.toPage.bind(this, 1)}>Page</Button>
                        <Button basic color = 'blue' style = {previousStyle} 
                        onClick = {this.toPrevious}>Prev</Button>
                        {pageList}
                        <Button basic color = 'blue' style = {nextStyle} 
                        onClick = {this.toNext}>Next</Button>
                        <Form onSubmit = {this.toPage.bind(this, this.state.inputPage)}>
                            <Input placeholder = 'Enter page number' 
                            onChange = {this.pageHandler}></Input>
                        </Form>
                    </div>
                </div>
                <Divider style = {dividerStyle}/>
                <div className = {footerStyle}>
                    <h2>Aniscore </h2>
                </div>
            </div>
        )
    }
}

export default SearchResult;