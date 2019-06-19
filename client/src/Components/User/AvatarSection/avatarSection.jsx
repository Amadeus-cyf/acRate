import React, {Component} from 'react';
import {Image, Button, Label} from  'semantic-ui-react';
import {hoverStyle} from './avatarSection.module.scss';

class AvatarSection extends Component {
    constructor() {
        super();
        this.state = {
            avatar: 'undefined',
            background: 'http://img.ecyss.com/original/20/20438/21435bb1f5454a70.jpg',
        }
        this.editAvatar = this.editAvatar.bind(this);
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        if (this.props.user.avatar) {
            let base64Flag = 'data:image/jpeg;base64,';
            let avatarStr = this.arrayBufferToBase64(this.props.user.avatar.data.data);
            this.setState({
                avatar: base64Flag + avatarStr,
            })
        } else {
            this.setState({
                avatar: 'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
            })
        }
    }

    editAvatar() {
        if (this.props.currentUser._id === this.props.user._id) {
            this.props.history.push('/editAvatar');
        }
    }
 
    render() {
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
                <Label style = {backgroundStyle}>
                    <Image className = {hoverStyle} onClick = {this.editAvatar} 
                    style = {avatarStyle} avatar src = {this.state.avatar}
                    />
                    <Label style = {textStyle}>
                        {this.props.user.username}
                    </Label>
                    <Button style = {buttonStyle} color = 'blue'>Follow</Button>
                </Label>
            </div>
        )
    }
}

export default AvatarSection;