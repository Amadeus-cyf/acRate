import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Label, Button, Image, Form, Input} from 'semantic-ui-react';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';
import AvatarSection from '../AvatarSection/avatarSection.jsx';
import Subnavibar from '../Subnavibar/subnavibar.jsx';
import {imageStyle, textStyle} 
from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';
import NoneditStarRating from '../../DetailPage/Information/Score/noneditRating.jsx';
import {bangumiSection, numberlistStyle, hoverStyle,
textSection} from './bangumi.module.scss';
import paging from '../../Home/paging.jsx';

class Bangumi extends Component {
    constructor() {
        super();
        this.state = {
            user: 'undefined',
            currentUser: 'undefined',
            bangumiList: [],
            currentBangumi: [],
            pageNumber: 1,
            currentPage: 1,
            inputPage: '',
        }
        this.toPrevious = this.toPrevious.bind(this);
        this.toNext = this.toNext.bind(this);
        this.pageHandler = this.pageHandler.bind(this);
    }

    componentDidMount() {
        /*axios.get('api/user/' + this.props.match.params.user_id)
        .then(response => {
            this.setState({
                user: response.data.data.user,
                bangumiList: response.data.data.user.scoreAnime,
                currentBangumi: response.data.data.user.scoreAnime.slice(0, 15),
            })
            let bangumiList = response.data.data.user.scoreAnime;
            if (bangumiList.length % 15) {
                this.setState({
                    pageNumber: (bangumiList.length - bangumiList.length % 15)/15 + 1,
                })
            } else {
                this.setState({
                    pageNumber: bangumiList.length / 15,
                })
            }
        }).catch(err => {
            alert(err);
        })*/
        this.setState({
            user: this.props.user,
            bangumiList: this.props.user.scoreAnime,
            currentBangumi: this.props.user.scoreAnime.slice(0, 15),
        })
        let bangumiList = this.props.user.scoreAnime;
        if (bangumiList.length % 15) {
            this.setState({
                pageNumber: (bangumiList.length - bangumiList.length % 15)/15 + 1,
            })
        } else {
            this.setState({
                pageNumber: bangumiList.length / 15,
            })
        }
    }

    toDetail(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
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

    toPrevious() {
        let pageNumber= this.state.currentPage - 1;
        let currentBangumi = [];
        if (15*pageNumber <= this.state.bangumiList.length) {
            currentBangumi = this.state.bangumiList.slice(15*(pageNumber-1), 15*pageNumber);
        } else {
            currentBangumi = this.state.bangumiList.slice(15*(pageNumber-1));
        }
        this.setState({
            currentBangumi: currentBangumi,
            currentPage: pageNumber,
        })
    }

    toNext() {
        let pageNumber = this.state.currentPage + 1;
        let currentBangumi = [];
        if (15*pageNumber <= this.state.bangumiList.length) {
            currentBangumi = this.state.bangumiList.slice(15*(pageNumber-1), 15*pageNumber);
        } else {
            currentBangumi = this.state.bangumiList.slice(15*(pageNumber-1));
        }
        this.setState({
            currentBangumi: currentBangumi,
            currentPage: pageNumber,
        })
    }

    toPage(pageNumber) {
        let currentBangumi = this.state.bangumiList.slice(15*(pageNumber-1), 15*pageNumber);
        this.setState({
            currentBangumi: currentBangumi,
            currentPage: pageNumber,
        })
    }

    render() {
        if (this.state.user === 'undefined') {
            let pageStyle = {
                display: 'block',
                margin: '10px auto',
                width: '85%',
                background: 'white',
            }
            return (
                <div>
                    <Navibar/>
                    <AvatarSection user = {this.state.user} currentUser = {this.props.currentUser}/>
                    <Subnavibar user = {this.state.user}current = 'bangumi'/>
                    <Label style = {pageStyle}>
                        <div>
                            <Image className = {imageStyle} src={loadingGif} alt = 'loading'/>
                        </div>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </Label>
                </div>
            )
        }
        let labelStyle = {
            background: 'white',
            width: '320px',
            height: 'auto',
            display: 'flex',
            marginTop: '20px',
            marginLeft: '20px'
        }
        let imgStyle = {
            width: '130px',
            height: '170px',
        }
        let bangumiList = this.state.bangumiList.map(bangumi => {
            return (
                <Label style = {labelStyle}>
                    <Image className = {hoverStyle} style = {imgStyle} 
                    onClick = {this.toDetail.bind(this, bangumi)} 
                    src = {bangumi.image_url} rounded/>
                    <div className = {textSection}>
                        <h3>{bangumi.title}</h3>
                        <NoneditStarRating average = {bangumi.score/2}/>
                        <p>{bangumi.synopsis.slice(0, 50) + '...'}</p>
                    </div>
                </Label>
            )
        })
        let pageArr = [];
        for(let i = 1; i <= this.state.pageNumber; i++) {
            pageArr.push(i);
        }
        let pageList = pageArr.map(page => {
            return paging(page, this.state.currentPage, this.state.pageNumber, 
            this.toPage.bind(this, page));
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
        return (
            <div>
                <Navibar/>
                <AvatarSection user = {this.state.user} currentUser = {this.props.currentUser}
                history = {this.props.history}/>
                <Subnavibar user = {this.state.user} current = 'bangumi'/>
                <Label style = {{background: 'white',  display: 'block', margin: '10px auto',
                width: '85%', height: 'auto'}}>
                    <div className = {bangumiSection}>
                        {bangumiList}
                    </div>
                    <div className ={numberlistStyle}>
                        <Button size = 'small' color = 'blue' onClick = {this.toPage.bind(this, 1)}>Page</Button>
                        <Button size = 'small' basic color = 'blue' style = {previousStyle} onClick = {this.toPrevious}>Prev</Button>
                        {pageList}
                        <Button basic color = 'blue' style = {nextStyle} onClick = {this.toNext}>Next</Button>
                        <Form onSubmit = {this.toPage.bind(this, this.state.inputPage)}>
                            <Input size = 'small' placeholder = 'Enter page number'onChange = {this.pageHandler}></Input>
                        </Form>
                    </div>
                </Label>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        user: state.user
    }
}


export default connect(mapStateToProps)(Bangumi);