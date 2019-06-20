import React, {Component} from 'react';
import {Label, Image, Button} from 'semantic-ui-react';
import NoneditStarRating from '../../DetailPage/Information/Score/noneditRating.jsx';
import {bangumiSection, titleStyle, textSection, hoverStyle} from './scoreBangumi.module.scss';

class  ScoreBangumi extends Component {
    constructor() {
        super();
        this.state = {
            scoreBangumi: [],
        }
    }

    componentDidMount() {
        this.setState({
            scoreBangumi: this.props.user.scoreAnime.slice(0, 4),
        })
    }

    toDetail(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    render() {
        if (this.state.scoreBangumi.length === []) {
            return <p>Not score any bangumi yet</p>
        }
        let labelStyle = {
            background: 'white',
            width: '500px',
            height: 'auto',
            display: 'flex',
            marginTop: '10px',
        }
        let imageStyle = {
            width: '170px',
            height: '220px',
        }
        let bangumiList = this.state.scoreBangumi.map(bangumi => {
            return (
                <Label style = {labelStyle}>
                    <Image className = {hoverStyle} style = {imageStyle} 
                    onClick = {this.toDetail.bind(this, bangumi)} 
                    src = {bangumi.image_url} rounded/>
                    <div className = {textSection}>
                        <h3>{bangumi.title}</h3>
                        <NoneditStarRating average = {bangumi.score/2}/>
                        <p>{bangumi.synopsis.slice(0, 170) + '...'}</p>
                    </div>
                </Label>
            )
        })
        return (
            <Label style = {{background: 'white',  display: 'block', margin: '0 auto',
             width: '90%', height: 'auto', marginTop: '1%'}}>
                <h2 className = {titleStyle}>Scored Bangumi</h2>
                <Button size = 'tiny' color = 'blue'>View more</Button>
                <div className = {bangumiSection}>
                    {bangumiList}
                </div>
            </Label>
        )
    }
}

export default ScoreBangumi;