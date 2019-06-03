import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import fire,{auth, provider} from '../fire';
import {Card, Button, Nav, Row, Col, Container, Modal} from 'react-bootstrap'
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

            currentMemberList : []
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
                console.log("user")
                self.setState({currentUser: user})

            
                var ref = fire.database().ref("users");
                ref.orderByChild("email").equalTo(self.state.currentUser.email).on("value", function(snapshot){
                snapshot.forEach(function(data) {
        
                    self.setState({userKey: data.key})
                  
                    var memberListRef = fire.database().ref("groups/" + self.state.content.group + "/event_list/" + self.state.index + "/member_list")
                    memberListRef.once("value").then(function (snapshot) {
                    
                    var list = snapshot.val();
                    self.setState({currentMemberList: list})
                    console.log("<<<<list>>>>")
                    console.log(list)
                    console.log("userKey")
                    console.log(self.state.userKey)
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
            <Card style = {{width : "400px", "maxWidth" : '400px'}}>
                <Card.Title> {this.state.content['event_name']}</Card.Title>
                <Card.Body>
                    {this.state.content.time}
                    <br/>
                    {this.state.content['desc']}
                </Card.Body>
                <Card.Footer>
                    <Col>
                    <Button onClick = {this.handleJoin}>{!this.state.joined ? "+RSVP" : "-Leave" }</Button>
                    </Col>
                    <Col>
                    {this.state.currentMemberList.slice(1,this.state.currentMemberList.length).map((item,key) =>
            
                        <Row>
                        <PeopleCard userKey = {item} />
                        </Row>
                    )}
                    </Col>
                </Card.Footer>
            </Card>
            </div>
        )
    }
}