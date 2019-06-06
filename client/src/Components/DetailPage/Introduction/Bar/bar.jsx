import React, { Component } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import NoneditStarRating from './noneditRating.jsx';

class HorizontalBar extends Component {
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
        }
        return(
            <div style = {{'font-size': '17pt'}}>
                <div>{this.state.average.toFixed(1)}</div>
                <div>{this.state.userNumber} users scored</div>
                <NoneditStarRating average = {this.state.average}/>
                <ReactApexChart style = {barStyle} options={this.state.options} series={this.state.series} type = 'bar'/>
            </div>
        )
    }
}

export default HorizontalBar;