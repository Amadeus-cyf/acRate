import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Label, Image, Button} from 'semantic-ui-react';
import {numberStyle, hoverPart, titleStyle} from './rank.module.scss';

class Rank extends Component {
    constructor(){
        super();
        this.state = {
            rankList: 'undefined',
        }
        this.toRank = this.toRank.bind(this);
    }


    componentDidMount() {
        axios.get('api/bangumiList/rank/' + 10)
        .then(response => {
            this.setState({
                rankList: response.data.data.bangumiList,
            })
        }).catch(err => {
            alert(err);
        })
    }

     toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }

    toRank() {
        this.props.history.push('/rank');
    }

    render() {
        if (this.state.rankList === 'undefined') {
            let labelStyle = {
                background: 'white',
                marginRight: '12%',
                width: '300px',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
            return (
                <Label style = {labelStyle}>
                    <h3 style = {{color: 'rgba(100, 100, 100, 0.7)', fontSize: '20pt'}}>Loading...</h3>
                </Label>
            )
        }
        let ranklist = this.state.rankList.map((bangumi, index) => {
            return (
                <div>
                    <Label style = {{background: 'white', marginTop: '20px', display: 'flex'}}>
                        <p className = {numberStyle}>{index+1}</p> 
                        <Image onClick = {this.toDetailPage.bind(this, bangumi)} className = {hoverPart}
                        style = {{width: '60px', height: '80px'}} 
                        src = {bangumi.image_url} rounded/>
                        <p onClick = {this.toDetailPage.bind(this, bangumi)} className = {titleStyle}>
                           {bangumi.title}
                        </p>
                    </Label>
                </div>
            )
        })
        let buttonStyle = {
            display: 'block',
            margin: '15px auto',
        }
        return (
            <Label style = {{background: 'white', marginRight: '10%', marginTop: '30px'}}>
                <h3>Bangumi rank</h3>
                {ranklist}
                <Button onClick = {this.toRank} size = 'small' color = 'blue'
                style = {buttonStyle}>View More</Button>
            </Label>
        )
    }
}

export default withRouter(Rank);