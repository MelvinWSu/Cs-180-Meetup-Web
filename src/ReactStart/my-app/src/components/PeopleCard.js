import React, {Component} from 'react';
import fire from '../fire';
import {Card, Nav, Row, Col} from 'react-bootstrap'
import './style.css';


export default class PeopleCard extends Component {
    constructor(props){
        super(props)

        this.state = {user: this.props.userKey,
                        profile_email: null,
                        profile_photo : null}
        
        console.log("PeopleCard initial states")
        console.log(this.state)
        
        //this.handleClick = this.handleClick.bind(this)
    }


    componentDidMount() {
        
        if(this.state.user){
            this.getData()
        }
        
    }

    async getData(){

        var userData = {}
        
        await fire.database().ref("users/" + this.state.user).once("value").then(function(snapshot){

            console.log("snapshot")
            console.log(snapshot.val())
            
            userData['theEmail'] = snapshot.val().email
            userData['thePhoto'] = snapshot.val().photo
            
        });

        this.setState({profile_email : userData['theEmail'],
                        profile_photo: userData['thePhoto']})
    }

    render(){

        
        return(
            <div>
                <Card>
                    <Row>
                        <Col>
                        {this.state.user ? <Nav.Link style = {{"color" : "black"}} variant = "dark" onClick = {() => window.location.href = "/profile/user/" + this.state.user}>
                        <img src = {this.state.profile_photo} height = "30px" width = "30px" />
                        { " " + this.state.profile_email}</Nav.Link> : null}
                        </Col> 
                    </Row>
                </Card>
                
            </div>
         
        )
    }
}