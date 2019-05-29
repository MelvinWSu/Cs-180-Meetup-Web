import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import fire,{auth, provider} from '../fire';
import {Card, Button, Nav, Row, Col, Container, Modal} from 'react-bootstrap'
import './style.css';


export default class EventCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentUser : null,
            content: this.props.content,
            index : this.props.index,
            joined: false
        }

        console.log("start states")
        console.log(this.state)

        //this.handleClick = this.handleClick.bind(this)
    }


    componentDidMount() {
        
        var self = this;
        auth.onAuthStateChanged(function(user){
            console.log('onAuthStateChange')
            if (user){
                console.log("user")
                self.setState({currentUser: user})
            }
            else{
                console.log("user is null")
            }
        })
    }

    
    handleJoin = () => {
        var self = this
        if(self.state.joined){
            self.setState({joined: false})
            var usersRef = fire.database().ref("groups/" + self.state.content.group +"/event_list/" + self.state.index);
            usersRef.once("value").then(function (snapshot) {
                var list = snapshot.val().member_list
                list.push(self.state.currentUser)
                usersRef.update({member_list : list})

            })


        }
        else{
            self.setState({joined:true})
        }
    }
    
    render(){

        
        return(

            <div>
            <Card style = {{width : "400px", "maxWidth" : '400px'}}>
                <Card.Title> {this.state.content['event_name']}</Card.Title>
                <Card.Body>
                    {this.state.content.time}
                    <br/>
                    {this.state.content['desc']}
                </Card.Body>
                <Card.Footer>
                    <Button onClick = {this.handleJoin}>{!this.state.joined ? "+RSVP" : "-Leave" }</Button>
                </Card.Footer>
            </Card>
            </div>
        )
    }
}