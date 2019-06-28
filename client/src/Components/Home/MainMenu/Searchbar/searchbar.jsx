import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Input, Form, Label, Button, Icon} from 'semantic-ui-react';
import {backgroundStyle, titleStyle, searchbarStyle} from './searchbar.module.scss';

class Searchbar extends Component {
    constructor() {
        super();
        this.state = {
            searchInput: '',
            filterList: [],
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
            return;
        }
        this.setState({
            searchInput: event.target.value
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
        } else {
            this.props.history.push('/search/' + this.state.searchInput);
        }
    }

    toDetailPage(bangumi) {
        this.props.history.push('/detail/' + bangumi.anime_id);
    }


    render() {
        let labelStyle = {
            display: this.state.labelDisplay,
            background: 'white',
            boxShadow: '0px 1px 5px 2px rgba(225, 225, 225, 0.5)',
        }
        let filterList = this.state.filterList.map(bangumi => {
            return (
                <p onClick = {this.toDetailPage.bind(this, bangumi)} 
                className = {titleStyle}>{bangumi.title}</p>
            )
        })
        return(
            <Form onSubmit = {this.searchHandler} className = {backgroundStyle}>
                <div className = {searchbarStyle}>
                    <Input value = {this.state.searchInput}
                    onChange = {this.inputHandler} size = 'big' type = 'text' 
                    placeholder = 'Enter at least one word' />
                    <Button style = {{'position': 'absolute'}} icon 
                    onClick = {this.searchHandler} size = 'big' color = 'blue'>
                        <Icon name = 'search'/>
                    </Button>
                    <Label style = {labelStyle}>{filterList}</Label>
                </div>
            </Form>
        )

    }
}

export default withRouter(Searchbar);