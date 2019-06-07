import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'semantic-ui-react'
import ReactApexChart from 'react-apexcharts';
import NoneditStarRating from './noneditRating.jsx';
import {scoreStyle, scoreTitle, innerButtonStyle} from './score.module.scss';

class Score extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                yaxis: {
                    labels: {
                        style: {
                            color: '#ffffff',
                            fontSize: '12pt',
                        }
                    }
                },
                xaxis: {
                    max: 100,
                    categories: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
                    labels: {
                        style: {
                            colors: ['#ffffff'],
                            fontSize: '12pt',
                        }
                    }
                },
            },
            series: [
                {
                    name: 'Percentage of User(%)',
                    data: ['0', '0', '0', '0', '0'],
                }
            ],
            scoreDisplay: 'block',
            userNumber: 0,
            average: 0.0,
            ratingDisplay: 'none'
        }
    }

    componentDidMount() {
        axios.get('api/bangumiScore/' + this.props.bangumiId)
        .then(response => {
            if (response.data.data.message === 'Bangumi not found') {
                this.setState({
                    scoreDisplay: 'none',
                })
            }
            let score = response.data.data.bangumiScore;
            if (score.userNumber === 0) {
                this.setState({
                    scoreDisplay: 'none',
                })
            }
            let percentage = [];
            for (let i = 1; i < 5; i++) {
                if (score[i].length === 0) {
                    percentage.push(0);
                } else {
                    let percent = (score[i]/score.userNumber * 100).toFixed(1);
                    percentage.push(percent.toString());
                }
            }
            this.setState({
                series: [
                    {
                        name: 'Percentage of User(%)',
                        data: percentage,
                    }, 
                ],
                usernumber: score.userNumber,
                average: score.averageScore,
            })
        })
    }

    render() {
        let barStyle = {
            width: '320px',
            color: 'white',
            'padding-top': '20px',
        }
        return(
            <div style = {{'font-size': '17pt'}}>
                <div className = {scoreStyle}>   
                    <Button size = 'big' color = 'blue' animated='fade' onClick = {this.props.scoreBangumi}>
                        <Button.Content visible className = {innerButtonStyle}>
                            <div className = {scoreTitle}>{this.state.average}</div>
                            <div>
                                <NoneditStarRating average = {this.state.average}/>
                                <p>{this.state.userNumber} users scored</p>
                            </div>
                        </Button.Content>
                        <Button.Content hidden>
                            <p style = {{'font-size': '14pt'}}>Score Bangumi</p>
                        </Button.Content>
                    </Button>
                </div>
                <ReactApexChart style = {barStyle} options={this.state.options} series={this.state.series} type = 'bar'/>
            </div>
        )
    }
}

export default Score;