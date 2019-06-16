import React, {Component} from 'react';
import axios from 'axios';
import {Label, Image, Divider} from 'semantic-ui-react';
import {pageStyle, title, numberStyle, bangumiSection, 
    bangumiStyle, textSection, hoverPart} from './ranking.module.scss';
import MainMenu from '../MainMenu/mainMenu.jsx';
import {pageContainer,textStyle, imageStyle} from '../SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../loading.gif'

class Ranking extends Component {
    constructor() {
        super();
        this.state = {
            rankList: 'undefined',
            totalScores: [],
        }
    }

    async componentDidMount() {
        try {
            var scoreList = await axios.get('api/bangumiScore/rank');
        } catch(err) {
            alert(err);
        }
        let bangumiList = scoreList.data.data.bangumiList;
        let promises = [];
        let totalScores = [];
        bangumiList.forEach(bangumi => {
            promises.push(axios.get('api/bangumiList/' + bangumi.anime_id));
            totalScores.push(bangumi.totalScore);
        })
        this.setState({
            totalScores: totalScores,
        })
        axios.all(promises)
        .then(response => {
            let rankList = [];
            response.forEach(res => {
                rankList.push(res.data.data.bangumi);
            })
            this.setState({
                rankList: rankList,
            })
        }).catch(err => {
            alert(err);
        })
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    render() {
        if (this.state.rankList === 'undefined') {
            return(
                <div>
                    <MainMenu history = {this.props.history} current = 'rank'/>
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
        if (this.state.rankList.length === 0) {
            return(
                <div>
                    <MainMenu history = {this.props.history} current = 'rank'/>
                    <div className = {pageContainer}>
                        <p className = {textStyle} style ={{fontSize: '20pt'}}>
                            No ranking yet
                        </p>
                    </div>
                </div>
            )
        }
        let rankList = this.state.rankList.map((bangumi, index) => {
            let labelStyle = {
                background: 'white',
            }
            let imageStyle = {
                width: '170px',
                height: '220px',
            }
            return (
                <div>
                    <Label style = {labelStyle}>
                    <div className = {bangumiStyle}>
                        <p className = {numberStyle}>{index+1}</p>
                        <Image onClick = {this.toDetailPage.bind(this, bangumi)} 
                        className = {hoverPart} style = {imageStyle} src = {bangumi.image_url} rounded/>
                        <div className = {textSection}>
                            <h3 style = {{color: 'rgba(30, 144, 255, 1)', fontSize: '15pt'}}>{bangumi.title}</h3>
                            <p>{bangumi.synopsis.slice(0, 120) + '...'}</p>
                            <p style = {{color: 'rgba(255, 180, 94, 1)', 
                            fontSize: '14pt'}}>Total score: {this.state.totalScores[index]}</p>
                        </div>
                    </div>
                    </Label>
                </div>
            )
        })
        return (
            <div className = {pageStyle}>
                <MainMenu history = {this.props.history} current = {'rank'}/>
                <h2 className = {title}>Top Bangumis</h2>
                <div className = {bangumiSection}>
                    <Divider/>
                        {rankList}
                    <Divider/>
                </div>
            </div>
        )
    }
}

export default Ranking;