import React, {Component} from 'react';
import axios from 'axios';
import {Image, Button, Label, Input} from  'semantic-ui-react';
import Navibar from '../../Home/MainMenu/Navibar/navibar.jsx';

class AvatarSection extends Component {
    constructor() {
        super();
        this.state = {
            avatar: 'undefined',
            background: 'http://img.ecyss.com/original/20/20438/21435bb1f5454a70.jpg',
            currentUser: 'undefined',
        }
        this.selectImage = this.selectImage.bind(this);
        this.upload = this.upload.bind(this);
    }

    fileInputRef = React.createRef();

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        axios.get('api/auth/currentUser')
        .then(response => {
            if (response.data.message === 'not login') {
                this.setState({
                    currentUser: undefined,
                })
            } else {
                this.setState({
                    currentUser: response.data.data,
                })
                if (response.data.data.avatar) {
                    let base64Flag = 'data:image/jpeg;base64,';
                    let avatarStr = this.arrayBufferToBase64(response.data.data.avatar.data.data);
                    this.setState({
                        avatar: base64Flag + avatarStr,
                    })
                } else {
                    this.setState({
                        avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
                    })
                }
            }
        }).catch(err => {
            alert(err);
        })
    }

    selectImage = (event) => {
        this.setState({
            avatar: event.target.files[0]
        });
    }

    upload() {
        const formData = new FormData();
        formData.append('avatar', this.state.avatar);
        axios.put('api/avatar/' + this.state.currentUser._id, formData)
        .then(() => {
            window.location.reload();
        }).catch(err => {
            alert(err);
        })
    }
 

    render() {
        if (this.state.currentUser === 'undefined') {
            return<p></p>
        }
        if (this.state.currentUser === undefined) {
            return <p></p>
        }
        if (this.state.avatar === 'undefined') {
            return <p>Loading...</p>
        }
        let backgroundStyle = {
            position: 'relative',
            display: 'block',
            margin: '0 auto',
            width: '90%',
            height: '300px',
            background: 'url(' + this.state.background + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'bottom left',
            'background-attachment': 'fixed',
            'background-size': 'cover',
        }
        let textStyle = {
            position: 'absolute',
            background: 'rgba(34, 140 ,255, 0.8)',
            left: '140px',
            bottom: '25px',
            fontSize: '13pt',
            color: 'white',
        }
        let avatarStyle = {
            position: 'absolute',
            transform: 'scale(2.5)',
            left: '70px',
            bottom: '40px',
        }
        let buttonStyle = {
            position: 'absolute',
            right: '70px',
            bottom: '25px',
        }
        return (
            <div>  
                <Navibar history = {this.props.history}/>
                <Label style = {backgroundStyle}>
                    <Image style = {avatarStyle} avatar src = {this.state.avatar}/>
                    <Label style = {textStyle}>
                        {this.state.currentUser.username}
                    </Label>
                    <Button
                        content="Choose Image"
                        labelPosition="left"
                        icon="file"
                        onClick={() => this.fileInputRef.current.click()}
                    />
                    <Button onClick= {this.upload}>Change avatar</Button>
                    <Input
                        ref={this.fileInputRef}
                        type="file"
                        hidden
                        onChange={this.selectImage}
                        name="avatar"
                    />
                    <Button style = {buttonStyle} color = 'blue'>Follow</Button>
                </Label>
            </div>
        )
    }
}

export default AvatarSection;