import React, {Component} from 'react';
import axios from 'axios';
import {Image, Label, Button, Form, Input} from 'semantic-ui-react';
import MainMenu from '../MainMenu/mainMenu.jsx';
import {pageContainer,textStyle, imageStyle} from '../SeasonBangumi/seasonBangumi.module.scss';
import {pageStyle, hoverPart, numberStyle, bangumiSection, numberlistStyle} from './allBangumi.module.scss';
import loadingGif from '../../loading.gif';

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
    }

    componentDidMount() {
        axios.get('api/bangumiList/' + this.state.currentPage)
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
        axios.get('api/bangumiList/' + pageNumber)
        .then(response => {
            this.setState({
                currentBangumi: response.data.data.bangumiList,
                currentPage: pageNumber,
            })
        }).catch(err => {
            alert(err);
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage + 1;
        this.setState({
            currentBangumi: [],
        })
        axios.get('api/bangumiList/' + pageNumber)
        .then(response => {
            this.setState({
                currentBangumi: response.data.data.bangumiList,
                currentPage: pageNumber,
            })
        }).catch(err => {
            alert(err);
        })
    }

    toPage(pageNumber) {
        this.setState({
            currentBangumi: [],
        })
        axios.get('/api/bangumiList/' + pageNumber)
        .then(response => {
            this.setState({
                currentBangumi: response.data.data.bangumiList,
                currentPage: pageNumber,
            })
        }).catch(err => {
            alert(err);
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

    sortHandler(sort) {
        this.setState({
            selectSort: sort,
        })
    }

    orderHandler(order) {
        this.setState({
            selectOrder: order,
        })
    }

    render() {
        if (this.state.currentBangumi.length === 0) {
            return (
                <div>
                    <MainMenu history = {this.props.history}/>
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
            let labelStyle = {
                'width': '400px',
                'height': 'auto',
                background: 'white',
                'display': 'flex',
                'justify-cotent': 'space-around',
                'margin-top': '20px',
            }
            let imgStyle = {
                width: '170px',
                height: '200px',
                'padding-right': '20px',
            }
            let rate = bangumi.score.toFixed(1);
            if (bangumi.userNumber === 0) {
                rate = '';
            }
            return(
                <Label onClick ={this.toDetailPage.bind(this, bangumi)} style = {labelStyle}>
                    <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} rounded/>
                    <div>
                        <p className = {hoverPart}>
                            {bangumi.title}
                            <span style = {{'font-size': '22pt', color: 'rgba(255, 180, 94, 1)', 'padding-left': '20px'}}>{rate}</span>
                        </p>
                        <p style = {{'font-size': '11pt'}}>{bangumi.synopsis.slice(0, 100) + '...'}</p>
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
        let pageArr = []
        for (let i = 1; i <= this.state.pageNumber; i++) {
            pageArr.push(i);
        }
        let pageList = pageArr.map(page => {
            if (page === this.state.currentPage) {
                return(
                    <Button onClick = {this.toPage.bind(this, page)} size = 'small' color = 'blue'>{page}</Button>
                )
            }
            if (page === 1) {
                return(
                    <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
                )
            }
            if (page === this.state.pageNumber) {
                return(
                    <Button onClick = {this.toPage.bind(this, page)} size = 'small' basic color = 'blue'>{page}</Button>
                )
            }
            if (this.state.currentPage > 2 && this.state.currentPage <= this.state.pageNumber-2) {
                if (page >= this.state.currentPage - 2 && page <= (this.state.currentPage + 2)) {
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

        return (
           <div>
                <MainMenu history = {this.props.history}/>
                <div className = {pageStyle}>
                    <div className = {bangumiSection}>
                        {currentBangumi}
                    </div>
                    <div className ={numberlistStyle}>
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

export default AllBangumi;