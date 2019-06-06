import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import HorionzontalBar from './Bar/bar.jsx';
import {introStyle, scoreStyle, genreStyle, genreListStyle} from './introduction.module.scss';

class Introduction extends Component {
    constructor() {
        super();
        this.state = {
            title_japanese: '/',
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
            return (
                <p>{producer.name}</p>
            )
        })
        let genres = this.props.bangumi.genres.map(genre => {
            return (
                <span className = {genreStyle}>{genre.name}</span>
            )
        })
        let studios = this.props.bangumi.studios.map(studio => {
            return (
                <p>{studio.name}</p>
            )
        })
        let backgroundStyle = {
            background: 'url(' + this.props.bangumi.image_url + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'cover',
        }

        return (
            <div>
                <div className = {scoreStyle} style = {backgroundStyle}> 
                    <Image rounded style = {imageStyle} src = {this.props.bangumi.image_url}/>
                    <div>
                        <h3> {this.props.bangumi.title}</h3>
                        <h3> {this.props.bangumi.title_japanese}</h3>
                        <p className = {genreListStyle}>
                            {genres}
                        </p>
                        <p>{producers}</p>
                        <p>{studios}</p>
                    </div>
                    <div>
                        <HorionzontalBar bangumiId = {this.props.bangumi.mal_id}/> 
                    </div>
                </div>
                <div className = {introStyle}>
                    <h2>Introduction</h2>
                </div>
            </div>
        )
    }
}

export default Introduction;
