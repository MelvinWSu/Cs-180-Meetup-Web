import React, { Component } from 'react';
import { storage } from '../fire';

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            uniqueLink: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleChange = event => {
        if (event.target.files[0]) {
            const picture = event.target.files[0];
            this.setState(() => ({picture}));
        }
    }
    handleUpload = () => {
        const {picture} = this.state;
        const uploadTask = storage.ref(`profile_img/${picture.name}`).put(picture);
        uploadTask.on('state_changed',
            (snapshot) => {
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref('profile_img').child(picture.name).getDownloadURL().then(uniqueLink => {
                    console.log(uniqueLink);
                    this.setState({uniqueLink});
                })
            });
    }
    render() {
        const style = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
        return (
            <div style={style}>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload</button>
                <br />
                <img src={this.state.uniqueLink || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
            </div>
        )
    }
}

export default UploadImage;