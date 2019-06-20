import React, {Component} from 'react';
import axios from 'axios';
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
            user: '',
            background: '',
            previewUrl: '',
            disabled: true,
        }
        this.selectBackground = this.selectBackground.bind(this);
        this.updateBackground = this.updateBackground.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(response => {
            this.setState({
                user: response.data.data,
            })
            if (response.data.data.background) {
                let base64Flag = 'data:image/jpeg;base64,';
                let backgroundStr = this.arrayBufferToBase64(response.data.data.background.data.data);
                this.setState({
                    background: base64Flag + backgroundStr,
                    previewUrl: base64Flag + backgroundStr,
                })
            } else {
                this.setState({
                    background: 'http://img.ecyss.com/original/20/20438/21435bb1f5454a70.jpg',
                    previewUrl: 'http://img.ecyss.com/original/20/20438/21435bb1f5454a70.jpg',
                })
            }
        }).catch(err => {
            alert(err);
        })
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
        axios.put('api/background/' + this.state.user._id, formData)
        .then(() => {
            window.location.reload();
        }).catch(err => {
            alert(err);
        })
        this.props.history.push('/userProfile/' + this.state.user._id);
    }

    cancel() {
        this.props.history.push('/userProfile/' + this.state.user._id);
    }

    render() {
        if (this.state.user === 'undefined' || !this.state.background) {
            return (
                <div>
                    <Navibar history = {this.props.history}/>
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
                <Navibar history = {this.props.history}/>
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

export default EditBackground;