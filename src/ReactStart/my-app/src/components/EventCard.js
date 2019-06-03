import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import fire,{auth, provider} from '../fire';
import {Card, Button, Nav, Row, Col, Container, Modal, Carousel} from 'react-bootstrap'
import PeopleCard from './PeopleCard'
import './style.css';


export default class EventCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentUser : null,
            userKey : null,

            content: this.props.content,
            index : this.props.index,
            joined: false,

            currentMemberList : [],
            editing : this.props.editing
        }

        console.log("start states")
        console.log(this.state)

        //this.handleClick = this.handleClick.bind(this)
    }


    componentDidMount() {
        
        var self = this;
        console.log("EventCard DidMount state")
        console.log(self.state)
        auth.onAuthStateChanged(function(user){
            console.log('onAuthStateChange')
            if (user){
                self.setState({currentUser: user})

            
                var ref = fire.database().ref("users");
                ref.orderByChild("email").equalTo(self.state.currentUser.email).on("value", function(snapshot){
                snapshot.forEach(function(data) {
        
                    self.setState({userKey: data.key})
                  
                    var memberListRef = fire.database().ref("groups/" + self.state.content.group + "/event_list/" + self.state.index + "/member_list")
                    memberListRef.once("value").then(function (snapshot) {
                    
                    var list = snapshot.val();
                    self.setState({currentMemberList: list})
                   
                    for( var i in list){
                        if (list[i] == self.state.userKey){
                        console.log("FOUND")
                        self.setState({joined: true})
                        }
                    }
            
                    })

                });})
            }
            else{
                console.log("user is null")
            }
        })
    }

    
    handleJoin = () => {
        var self = this
        if(!self.state.joined){

            setTimeout(() =>  {
                self.setState({joined: true})
                
                var groupRef = fire.database().ref("groups/" + self.state.content.group + "/event_list/" + self.state.index + "/member_list")
                groupRef.once("value").then(function (snapshot) {
                  
                  var list = snapshot.val()
                  console.log("list being pushed")
                  console.log(list)
                  console.log(typeof(list))
                  list.push(self.state.userKey)
                  
                  self.setState({currentMemberList : list})
                  groupRef.set(list)
              });
                console.log("pushed user in member_list");
                console.log("after push state")
                console.log(self.state)
                
                });

        }
        else{
            setTimeout(() =>  {
                self.setState({joined: false})
                
                var groupRef = fire.database().ref("groups/" + self.state.content.group + "/event_list/" + self.state.index + "/member_list")
                groupRef.once("value").then(function (snapshot) {
                  
                  var list = snapshot.val()
                  
                  console.log("deleting list")
                  console.log(list)
                  for(var i = 0 ; i < list.length ; i++){
                      if (list[i] == self.state.userKey){
                          list.splice(i,1)
                      }
                  }
                  
                  self.setState({currentMemberList : list})
                  groupRef.set(list)
              });
                console.log("pushed user in member_list");
                console.log("after push state")
                console.log(self.state)
                
                });
        }
    }
    
    handleDelete = (event) => {
        event.preventDefault()
        var self = this
        var groupRef = fire.database().ref("groups/" + self.state.content.group + "/event_list/" + self.state.index)
        this.state.visible = false
        groupRef.remove();
        document.location.reload();
        //delete event in groups
        
    }
    render(){
        return(
            <div>
            <Card style = {{width : "400px", "maxWidth" : '400px', alignContent: "center"}}>
                <Card.Title style = {{"marginTop" : "20px"}}> 
                    <Row>
                        <Col>{this.state.content['event_name']}</Col>
                        <Col>{this.state.content.time}</Col>
                    </Row></Card.Title>
                <Card.Body style = {{ "alignContent": "center"}}>
                    <Row>
                    
                    <br/>
                    </Row>
                    <Row style = {{"alignContent": "center"}}>
                     <Col></Col>  
                    <Col md = {10}>{this.state.content['desc']}</Col>
                    <Col></Col>
                    <br/>
                    <br></br>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>Attendees: {this.state.currentMemberList.length-1} </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                    <Col></Col>
                    <Col>
                    <Carousel indicators = {false}>
                    {this.state.currentMemberList.slice(1,this.state.currentMemberList.length).map((item,key) =>
                            
                        <Carousel.Item><PeopleCard userKey = {item} /></Carousel.Item>
                        
                    )}
                    </Carousel>
                    </Col>
                    <Col></Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Col>
                    <Button onClick = {this.handleJoin}>{!this.state.joined ? "+RSVP" : "-Leave" }</Button>
                    </Col>
                </Card.Footer>
            </Card>
            </div>
        )
    }
}