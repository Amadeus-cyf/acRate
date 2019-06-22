import React, {Component} from 'react';
import axios from 'axios';
import {Image, Button, Input} from  'semantic-ui-react';
import Navibar from '../Navibar/navibar.jsx';
import {pageStyle, bodyStyle, footerStyle} from './editAvatar.module.scss';
import {pageContainer, imageStyle, textStyle} 
from '../../Home/SeasonBangumi/seasonBangumi.module.scss';
import loadingGif from '../../searchloading.gif';

class EditAvatar extends Component {
    constructor() {
        super();
        this.state = {
            user: 'undefined',
            avatar: '',
            previewUrl: '',
            disabled: true,
        }
        this.selectImage = this.selectImage.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
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
            if (response.data.data.avatar) {
                let base64Flag = 'data:image/jpeg;base64,';
                let avatarStr = this.arrayBufferToBase64(response.data.data.avatar.data.data);
                this.setState({
                    avatar: base64Flag + avatarStr,
                    previewUrl: base64Flag + avatarStr,
                })
            } else {
                this.setState({
                   avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
                   previewUrl: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    selectImage(event) {
        let reader = new FileReader();
        let files = event.target.files;
        reader.onloadend = () => {
            this.setState({
                avatar: files[0],
                previewUrl: reader.result,
                disabled: false,
            });
        }
        reader.readAsDataURL(files[0])
    }

    updateAvatar() {
        const formData = new FormData();
        formData.append('avatar', this.state.avatar);
        axios.put('api/avatar/' + this.state.user._id, formData)
        .then().catch(err => {
            alert(err);
        })
        this.props.history.push('/user/userProfile/' + this.state.user._id);
    }

    cancel() {
        this.props.history.push('/user/userProfile/' + this.state.user._id);
    }

    render() {
        if (this.state.user === 'undefined' || !this.state.avatar) {
            return (
                <div>
                    <Navibar history = {this.props.history}
                    currentUser = {this.state.user}/>
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
        let avatarStyle = {
            width: '300px',
            height: '300px',
        }
        return (
            <div className = {pageStyle}>  
                <Navibar history = {this.props.history}
                currentUser = {this.state.user}/>
                <div className = {bodyStyle}>
                    <Image style = {avatarStyle} avatar
                    src = {this.state.previewUrl}
                    />
                    <Input type="file" accept = "image/*" hidden 
                    onChange={this.selectImage} name = 'avatar'
                    />
                    <div>
                        <Button size = 'huge' color = 'blue' 
                        onClick= {this.updateAvatar} 
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

export default EditAvatar;