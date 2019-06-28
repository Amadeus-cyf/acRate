import React from 'react';
import {Image, Label} from 'semantic-ui-react';

function labeling(bangumi, selectSort, toDetailPage, hoverPart, introStyle, scoreCss, dateCss) {
    let labelStyle = {
        'width': '390px',
        'height': 'auto',
        background: 'white',
        'display': 'flex',
        'justify-cotent': 'space-around',
        'margin-top': '20px',
    }
    let imgStyle = {
        width: '160px',
        height: '200px',
        'margin-right': '20px',
    }
    let dateStyle = {
        display: 'none',
    }
    let scoreStyle = {
        display: 'none'
    }
    if (selectSort === 'date') {
        dateStyle = {
            display: 'inline',
        }
    } else {
        scoreStyle = {
            display: 'inline',
        }
    }
    let rate = bangumi.score.toFixed(1);
    if (bangumi.userNumber === 0) {
        rate = '';
    }
    let date = '';
    let year = 'unknown';
    let month = '';
    let day = '';
    if (bangumi.airing_start !== '') {
        date = new Date(bangumi.airing_start);
        year = date.getFullYear();
        month = '-' + (date.getMonth()+1);
        day = '-' + date.getDate();
    }
    return(
        <Label onClick ={toDetailPage} style = {labelStyle}>
            <Image className = {hoverPart} style = {imgStyle} src = {bangumi.image_url} rounded/>
            <div>
                <div style = {{'display' :'flex'}}>
                    <span className = {hoverPart}>{bangumi.title}</span>
                    <span className = {scoreCss} style = {scoreStyle}>{rate}</span>
                </div>
                <p style = {dateStyle} className = {dateCss}>{year}{month}{day}</p>
                <p className = {introStyle}>{bangumi.synopsis.slice(0, 120) + '...'}</p>
            </div>
        </Label>
    )
}

export default labeling;