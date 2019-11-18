import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setCurrentUser, setUser} from '../../../store/action.js';
import {Input, Button, Image} from 'semantic-ui-react';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';
import {pageStyle, bodyStyle, footerStyle} from './editBackground.module.scss';
import {pageContainer, imageStyle, textStyle} 
from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';

class EditBackground extends Component {
    constructor() {
        super();
        this.state = {
            background: '',
            previewUrl: '',
            disabled: true,
        }
        this.selectBackground = this.selectBackground.bind(this);
        this.updateBackground = this.updateBackground.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUser.background) {
            this.setState({
                background:  this.props.currentUser.background,
                previewUrl: this.props.currentUser.background,
            })
        } else {
            this.setState({
                background: 'http://img.ecyss.com/original/20/20438/21435bb1f5454a70.jpg',
                previewUrl: 'http://img.ecyss.com/original/20/20438/21435bb1f5454a70.jpg',
            })
        }
    }

    selectBackground(event) {
        let reader = new FileReader();
        let files = event.target.files;
        reader.onloadend = () => {
            this.setState({
                background: files[0],
                previewUrl: reader.result,
                disabled: false,
            })
        }
        reader.readAsDataURL(files[0]);
    }

    updateBackground() { 
        const formData = new FormData();
        formData.append('background', this.state.background);
        axios.put('api/background/' + this.props.currentUser._id, formData)
        .then(res => {
            this.props.setCurrentUser(res.data.data.user)
            this.props.setUser(this.props.currentUser._id, this.props.history, '/user/userProfile/' + this.props.currentUser._id)
        }).catch(err => {
            alert(err);
        })
    }

    cancel() {
        this.props.history.push('/user/userProfile/' + this.props.currentUser._id);
    }

    render() {
        if (!this.state.background) {
            return (
                <div>
                    <Navibar/>
                    <div className = {pageContainer}>
                        <div>
                            <Image className = {imageStyle} src={loadingGif} alt = 'loading'/>
                        </div>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </div>
                </div>
            )
        }
        let backgroundStyle = {
            width: 'auto',
            height: '300px',
        }
        return (
            <div className = {pageStyle}>
                <Navibar/>
                <div className = {bodyStyle}>
                    <Image style = {backgroundStyle}
                    src = {this.state.previewUrl}
                    />
                    <Input type="file" accept = "image/*" hidden 
                    onChange={this.selectBackground} name = 'background'
                    />
                    <div>
                        <Button size = 'huge' color = 'blue' 
                        onClick= {this.updateBackground} 
                        disabled = {this.state.disabled}>Update</Button>
                        <Button size = 'huge' color = 'blue'
                        onClick = {this.cancel}>Cancel</Button>
                    </div>
                </div>
                <div className = {footerStyle}>
                    <h2>AniScore</h2>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {setCurrentUser, setUser})(EditBackground);