import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearUser} from '../../../../store/action.js';
import {Label, Image, Button} from 'semantic-ui-react';
import NoneditStarRating from '../../../DetailPage/Information/Score/noneditRating.jsx';
import {bangumiSection, titleStyle, textSection, hoverStyle} from './scoreBangumi.module.scss';

class  ScoreBangumi extends Component {
    constructor() {
        super();
        this.state = {
            scoreBangumi: [],
        }
        this.viewMore = this.viewMore.bind(this);
    }

    componentDidMount() {
        this.setState({
            scoreBangumi: this.props.user.scoreAnime.slice(0, 4),
        })
    }

    toDetail(bangumi) {
        if (this.props.user !== 'undefined') {
            this.props.clearUser();
        }
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    viewMore() {
        this.props.history.push('/user/scoreBangumi/' + this.props.user._id);
    }

    render() {
        if (this.state.scoreBangumi.length === 0) {
            return (
                <Label style = {{background: 'white', position: 'relative', display: 'flex',
                justifyContent: 'center', alignItems: 'center', width: '57%', height: 'auto'}}>
                     <h2  style = {{color: 'rgba(100, 100, 100, 0.6)'}}>No scored bangumi yet</h2>
                </Label>
            )
        }
        let labelStyle = {
            background: 'white',
            height: 'auto',
            width: '350px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: '10px',
        }
        let imageStyle = {
            width: '140px',
            height: '180px',
        }
        let viewMoreStyle = {
            position: 'absolute',
            right: '10px',
            bottom: '10px',
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
                        <p>{bangumi.synopsis.slice(0, 40) + '...'}</p>
                    </div>
                </Label>
            )
        })
        return (
            <Label style = {{background: 'white', position: 'relative',
            width: '57%', height: 'auto'}}>
                <h3 className = {titleStyle}>
                    Scored Bangumi 
                </h3>
                <div className = {bangumiSection}>
                    {bangumiList}
                </div>
                <Button style = {viewMoreStyle} onClick = {this.viewMore} size = 'tiny' 
                color = 'blue'>View more</Button>
            </Label>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        user: state.user
    }
}

export default connect(mapStateToProps, {clearUser})(withRouter(ScoreBangumi));