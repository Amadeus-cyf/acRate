import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import Score from './Score/score.jsx';
import {introStyle, genreStyle, genreListStyle, titleStyle,
    textSectionStyle, producerStyle, episodeStyle, studioStyle} from './information.module.scss';

class Information extends Component {
    constructor() {
        super();
        this.state = {
            title_japanese: 'unknown',
        }
    }

    componentDidMount() {
        if (this.props.bangumi.title_japanese) {
            this.setState({
                title_japanese: this.props.bangumi.title_japanese,
            })
        }
    }

    render() {
        let imageStyle = {
            width: '240px',
            height: '320px',
            border: '4px solid white',
        }
        let producers = this.props.bangumi.producers.map(producer => {
                if (producer.name) {
                    return (
                        <p>{producer.name}</p>
                    )
                } else {
                    return (
                        <p>{producer}</p>
                    )
                }
            })
        if (producers.length === 0) {
            producers = 'unknown';
        }
        let genres = this.props.bangumi.genres.map(genre => {
            if (genre.name) {
                return (
                    <span className = {genreStyle}>{genre.name}</span>
                )
            } else {
                return <span className = {genreStyle}>{genre}</span>
            }
        })
        let studios = <p>unknown</p>
        if (this.props.bangumi.studios) {
            studios = this.props.bangumi.studios.map(studio => {
                return (
                    <p>{studio.name}</p>
                )
            })
        }
        let episodes = this.props.bangumi.episodes;
        let airing_status = this.props.bangumi.status;
        if (!airing_status) {
            airing_status = 'unknown';
        }
        let date = 'unknown';
        if (this.props.bangumi.aired) {
            date = this.props.bangumi.aired.from;
        }
        if (!episodes) {
            episodes = <span>unknown</span>
        }
        let year = ''
        let month = ''
        let day = ''
        if (date !== 'unknown') {
            date = new Date(date);
            year = date.getFullYear();
            month = date.getMonth()+1;
            day = date.getDate()+1;
        }
        let backgroundStyle = {
            background: 'url(' + this.props.bangumi.image_url + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'cover',
        }
        return (
            <div>
                <div className = {introStyle} style = {backgroundStyle}> 
                    <Image rounded style = {imageStyle} src = {this.props.bangumi.image_url}/>
                    <div className = {textSectionStyle}>
                        <p className = {titleStyle}> {this.props.bangumi.title}</p>
                        <p className = {titleStyle}> {this.props.bangumi.title_japanese}</p>
                        <p className = {genreListStyle}>{genres}</p>
                        <div className = {episodeStyle}>
                            <p>Airing Start: {year}.{month}.{day}</p>
                            <p>Episodes: {episodes}</p>
                            <p>{airing_status}</p>
                        </div>
                        <div className = {producerStyle}>
                            <p>Producers:</p> {producers}
                        </div>
                        <div className = {studioStyle}>
                            <p>Studios: </p> {studios}
                        </div>
                    </div>
                    <Score bangumiId = {this.props.bangumi.mal_id}
                    scoreBangumi = {this.props.scoreBangumi}/>
                </div>
            </div>
        )
    }
}

export default Information;
