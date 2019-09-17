import React, {Component} from 'react';
import axios from 'axios';
import {Image, Button, Form, Input, Radio} from 'semantic-ui-react';
import MainMenu from '../MainMenu/mainMenu.jsx';
import {pageContainer,textStyle, imageStyle} from '../SeasonBangumi/seasonBangumi.module.scss';
import {pageStyle, hoverPart, introStyle, bangumiSection, 
    numberlistStyle, scoreCss, dateCss, radioStyle} from './allBangumi.module.scss';
import loadingGif from '../../loading.gif';
import paging from '../paging.jsx';
import labeling from './labeling.jsx';

class AllBangumi extends Component {
    constructor() {
        super();
        this.state = {
            currentBangumi: [],
            pageNumber: 1,
            bangumiNumber: 0,
            currentPage: 1,
            inputPage: '',
            selectOrder: 'descending',
            selectSort: 'date',
        }
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
        this.sortHandler = this.sortHandler.bind(this);
        this.orderHandler = this.orderHandler.bind(this);
    }

    componentDidMount() {
        axios.get('api/bangumiList/date/' + this.state.currentPage + '/order/' + -1)
        .then(response => {
            this.setState({
                currentBangumi: response.data.data.bangumiList,
            })
        }).catch(err => {
            alert(err);
        })
        axios.get('api/bangumiList/count')
        .then(response => {
            let bangumiNumber = response.data.data.bangumiNumber;
            let pageNumber = 0;
            if (bangumiNumber % 24) {
                pageNumber = (bangumiNumber-bangumiNumber%24)/24 + 1;
            } else {
                pageNumber = bangumiNumber / 24;
            }
            this.setState({
                bangumiNumber: bangumiNumber,
                pageNumber: pageNumber,
            })
        })
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    toPrevious() {
        let pageNumber = this.state.currentPage-1;
        this.setState({
            currentBangumi: [],
        })
        let order = -1;
        if (this.state.selectOrder === 'ascending') {
            order = 1;
        }
        if (this.state.selectSort === 'date') {
            axios.get('/api/bangumiList/date/' + pageNumber + '/order/' + order)
            .then(response => {
                this.setState({
                    currentBangumi: response.data.data.bangumiList,
                    currentPage: pageNumber,
                })
            }).catch(err => {
                alert(err);
            })
        } else {
            axios.get('/api/bangumiList/score/' + pageNumber + '/order/' + order)
            .then(response => {
                this.setState({
                    currentBangumi: response.data.data.bangumiList,
                    currentPage: pageNumber
                })
            }).catch(err => {
                alert(err);
            })
        }
    }

    toNext() {
        let pageNumber = this.state.currentPage + 1;
        this.setState({
            currentBangumi: [],
        })
        let order = -1;
        if (this.state.selectOrder === 'ascending') {
            order = 1;
        }
        if (this.state.selectSort === 'date') {
            axios.get('/api/bangumiList/date/' + pageNumber + '/order/' + order)
            .then(response => {
                this.setState({
                    currentBangumi: response.data.data.bangumiList,
                    currentPage: pageNumber,
                })
            }).catch(err => {
                alert(err);
            })
        } else {
            axios.get('/api/bangumiList/score/' + pageNumber + '/order/' + order)
            .then(response => {
                this.setState({
                    currentBangumi: response.data.data.bangumiList,
                    currentPage: pageNumber
                })
            }).catch(err => {
                alert(err);
            })
        }
    }

    toPage(pageNumber) {
        if (pageNumber === '') {
            return;
        }
        this.setState({
            currentBangumi: [],
        })
        let order = -1;
        if (this.state.selectOrder === 'ascending') {
            order = 1;
        }
        if (this.state.selectSort === 'date') {
            axios.get('/api/bangumiList/date/' + pageNumber + '/order/' + order)
            .then(response => {
                this.setState({
                    currentBangumi: response.data.data.bangumiList,
                    currentPage: pageNumber,
                })
            }).catch(err => {
                alert(err);
            })
        } else {
            axios.get('/api/bangumiList/score/' + pageNumber + '/order/' + order)
            .then(response => {
                this.setState({
                    currentBangumi: response.data.data.bangumiList,
                    currentPage: pageNumber
                })
            }).catch(err => {
                alert(err);
            })
        }
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

    sortHandler() {
        let sort = 'date'
        if (this.state.selectSort === 'date') {
            this.setState({
                selectSort: 'score',
            })
            sort = 'score';
        } else {
            this.setState({
                selectSort: 'date',
            })
        }
        this.setState({
            currentPage: 1,
            currentBangumi: [],
        })
        let order = -1;
        if (this.state.selectOrder === 'ascending') {
            order = 1;
        }
        axios.get('api/bangumiList/' + sort + '/' + 1 + '/order/' + order)
        .then(response => {
            this.setState({
                currentBangumi: response.data.data.bangumiList,
            })
        }).catch(err => {
            alert(err);
        })
    }

    orderHandler() {
        let sort = this.state.selectSort;
        if (this.state.selectOrder === 'descending') {
            this.setState({
                selectOrder: 'ascending',
                currentBangumi: [],
            })
            axios.get('api/bangumiList/' + sort + '/' + 1 + '/order/' + 1)
            .then(response => {
                this.setState({
                    currentBangumi: response.data.data.bangumiList,
                })
            }).catch(err => {
                alert(err);
            })
        } else {
            this.setState({
                selectOrder: 'descending',
                currentBangumi: [],
            })
            axios.get('api/bangumiList/' + sort + '/' + 1 + '/order/' + -1)
            .then(response => {
                this.setState({
                    currentBangumi: response.data.data.bangumiList,
                })
            }).catch(err => {
                alert(err);
            })
        }
    }

    render() {
        if (this.state.currentBangumi.length === 0) {
            return (
                <div>
                    <MainMenu history = {this.props.history} current = 'bangumi'/>
                    <div className = {radioStyle}>
                        <span style = {{'margin-right': '50px'}}>
                            <span style = {{'margin-left': '10px'}}>Sort by Rating</span>
                            <Radio slider onChange = {this.sortHandler}/>
                            <span style = {{'margin-right': '10px'}}>Sort by Date</span>
                        </span>
                        <span>
                            <span style = {{'margin-left': '10px'}}>Ascending</span>
                            <Radio slider onChange = {this.orderHandler}/>
                            <span style = {{'margin-right': '10px'}}>Descending</span>
                        </span>
                    </div>
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
        let currentBangumi = this.state.currentBangumi.map(bangumi => {
            return labeling(bangumi, this.state.selectSort, this.toDetailPage.bind(this, bangumi), 
            hoverPart, introStyle, scoreCss, dateCss);
        })
        // process number list
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
        let pageArr = []
        for (let i = 1; i <= this.state.pageNumber; i++) {
            pageArr.push(i);
        }
        let pageList = pageArr.map(page => {
            return paging(page, this.state.currentPage, this.state.pageNumber, 
            this.toPage.bind(this, page));
        })
        return (
            <div>
                <MainMenu history = {this.props.history} current = 'bangumi'/>
                <div className = {radioStyle}>
                    <span style = {{'margin-right': '50px'}}>
                        <span style = {{'margin-left': '10px'}}>Sort by Rating</span>
                        <Radio slider onChange = {this.sortHandler}/>
                        <span style = {{'margin-right': '10px'}}>Sort by Date</span>
                    </span>
                    <span>
                        <span style = {{'margin-left': '10px'}}>Ascending</span>
                        <Radio slider onChange = {this.orderHandler}/>
                        <span style = {{'margin-right': '10px'}}>Descending</span>
                    </span>
                </div>
                <div className = {pageStyle}>
                    <div className = {bangumiSection}>
                        {currentBangumi}
                    </div>
                    <div className ={numberlistStyle}>
                        <Button color = 'blue' onClick = {this.toPage.bind(this, 1)}>Page</Button>
                        <Button basic color = 'blue' style = {previousStyle} 
                        onClick = {this.toPrevious}>Prev</Button>
                        {pageList}
                        <Button basic color = 'blue' style = {nextStyle} 
                        onClick = {this.toNext}>Next</Button>
                        <Form onSubmit = {this.toPage.bind(this, this.state.inputPage)}>
                            <Input size = 'big' placeholder = 'Enter page number'
                            onChange = {this.pageHandler}></Input>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllBangumi;