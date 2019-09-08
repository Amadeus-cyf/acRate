import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {Label, Button, Form, Input} from 'semantic-ui-react';
import {textStyle, searchStyle} from './searchbar.module.scss';

class Searchbar extends Component {
    constructor() {
        super();
        this.state = {
            searchInput: '',
            filterList:  [],
            bangumiList: [],
            labelDisplay: 'none',
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
    }

    inputHandler(event) {
        if (event.target.value === '') {
            this.setState({
                searchInput: '',
                filterList: [],
                bangumiList: [],
                labelDisplay: 'none',
            })
        }
        this.setState({
            searchInput: event.target.value,
        })
        if (event.target.value.length < 4) {
            return;
        }
        if (event.target.value.length === 4) {
            let searchInput = event.target.value[0].toUpperCase() + event.target.value.slice(1);
            axios.get('api/bangumiList/filter/' + searchInput)
            .then(response => {
                if (response.data.data.bangumiList.length > 6) {
                    this.setState({
                        filterList: response.data.data.bangumiList.slice(0, 6),
                    })
                } else {
                    this.setState({
                        filterList: response.data.data.bangumiList,
                    })
                }
                this.setState({
                    bangumiList: response.data.data.bangumiList,
                    labelDisplay: 'block',
                })
            })
        } else {
            let searchInput = event.target.value[0].toUpperCase() + event.target.value.slice(1);
            let filterlist = this.state.bangumiList.filter(bangumi => {
                return bangumi.title.indexOf(searchInput) === 0;
            })
            this.setState({
                filterList: filterlist,
            })
        }
    }

    searchHandler() {
        if (this.state.searchInput === '') {
            return;
        }
        this.props.history.push('/search/' + this.state.searchInput);
        window.location.reload();
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id)
    }

    render() {
        let filterList = this.state.filterList.map(bangumi => {
            return <p className = {textStyle} onClick = {this.toDetailPage.bind(this, bangumi)}>{bangumi.title}</p>
        })
        let buttonStyle = {
            height: '50px',
        }
        let labelDisplay = {
            width: '320px',
            background: 'white',
            display: this.state.labelDisplay,
            'box-shadow': '0px 1px 5px 2px rgba(225, 225, 225, 0.5)',
            position: 'absolute',
            'z-index': '1',
        }
        let inputStyle = {
            width: '320px',
        }
        return(
            <Form onSubmit = {this.searchHandler}>
                <div className = {searchStyle}>
                    <div style = {{'padding-right': '30px'}}>
                        <Input style = {inputStyle} size = 'huge' type = 'text' placeholder = 'Enter bangumi name'
                               value = {this.state.searchInput} onChange = {this.inputHandler}></Input>
                        <Label style = {labelDisplay}>{filterList}</Label>
                    </div>
                    <Button style = {buttonStyle} content = 'Search' icon = 'search' 
                    size = 'big' color = 'blue' onClick = {this.searchHandler}></Button>
                </div>
            </Form>
        )
    }
}

export default withRouter(Searchbar);