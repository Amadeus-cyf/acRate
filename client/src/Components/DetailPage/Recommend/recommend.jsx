import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Label, Image} from 'semantic-ui-react';
import mapping from './mapping.jsx';
import {loadingStyle, recommendStyle, noRecommendStyle, titleStyle, 
    hoverPart, scoreStyle, bangumiStyle} from './recommend.module.scss';

class Recommend extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: {},
            bangumiList: 'undefined',
        }
    }

    async componentDidMount() {
        try {
            var bangumi = await axios.get('api/bangumiScore/' + this.props.bangumi.mal_id);
        } catch(err) {
            alert(err);
        }
        // bangumi not found, for upcoming and new bangumi
        if (!bangumi.data.data.bangumiScore) {
            this.setState({
                bangumiList: [],
            })
            return;
        }
        this.setState({
            bangumi: bangumi.data.data.bangumiScore,
        })
        let bangumiScore = bangumi.data.data.bangumiScore;
        // there are user logged in
        if (this.props.currentUser !== 'undefined') {
            let score = 5;
            let isScored = false;
            for (let i = 5; i > 0; i--) {
                if (bangumiScore[i].includes(this.props.currentUser._id)) {
                    score = i;
                    isScored = true;
                    break;
                }
            }
            if (bangumiScore[score].length === 1) {
                isScored = false;
            }
            // if no user rate same score as currentUser or only currentUser rate this score, 
            //then set score to 5
            if (!isScored) {
                score = 5;
            }
            let promises = [];
            // find all users who rate the same score as current user
            for (let i = 0; i < bangumiScore[score].length; i++) {
                promises.push(axios.get('api/user/' + bangumiScore[score][i]));
            }
            try {
                var userData = await axios.all(promises);
            } catch(err) {
                alert(err);
            }
            let userList = [];
            userData.forEach(user => {
                userList.push(user.data.data.user);
            })
            // find all high score bangumi of those users
            let map = {}
            let bangumiList = mapping(userList, map, this.props.bangumi.mal_id);
            this.setState({
                bangumiList: bangumiList,
            })
        } else {
            // no user log in, then recommend anime of those users who rate with score 5
            let promises = [];
            if (bangumiScore[5].length === 0) {
                this.setState({
                    bangumiList: [],
                })
                return;
            }
            for (let i = 0; i  < bangumiScore[5].length; i++) {
                promises.push(axios.get('api/user/' + bangumiScore[5][i]));
            }
            try {
                var userData2 = await axios.all(promises);
            } catch(err) {
                alert(err);
            }
            let userList = [];
            userData2.forEach(user => {
                userList.push(user.data.data.user);
            })
            // find all high score bangumi of those users
            let map = {}
            let bangumiList = mapping(userList, map, this.props.bangumi.mal_id);
            this.setState({
                bangumiList: bangumiList,
            })
        }
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
        window.location.reload();
    }
  
    render() {
        if (this.state.bangumiList.length === 0) {
            return (
                <div>
                    <h2 style = {{marginLeft: '10%'}}>Recommendation</h2>
                    <div className = {noRecommendStyle}>
                        <p>No recommendation yet</p>
                    </div>
                </div>
            )
        }
        if (!this.state.bangumi.anime_id || this.state.bangumiList === 'undefined') {
            return (
                <div className = {loadingStyle}>Loading recommended bangumis...</div>
            )
        }
        let labelStyle = {
            background: 'white',
            width: '190px',
            height: 'auto',
        }
        let imageStyle = {
            width: '170px',
            height: '210px',
        }
        let bangumiList = this.state.bangumiList.map(bangumi => {
            return (
                <Label style = {labelStyle}>
                    <Image className = {hoverPart} onClick = {this.toDetailPage.bind(this, bangumi)} style = {imageStyle} src = {bangumi.image_url} rounded/>
                    <div className = {titleStyle}>
                        {bangumi.title}
                        <p className = {scoreStyle}>total score: {bangumi.score}</p>
                    </div>
                </Label>
            )
        })
        return(
            <div className = {recommendStyle}>
                <h2>Recommendation</h2>
                <div className = {bangumiStyle}>
                    {bangumiList}
                </div>
            </div>
        )
    }
}

export default withRouter(Recommend);