import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import fire,{auth, provider} from '../fire';
import {Card, Button, Nav, Row, Col, Container, Modal} from 'react-bootstrap'


export default class  GroupCard extends Component{

    constructor(props){
        super(props)

        this.state = {
            item: this.props.item,
            key: this.props.key
        }

        
        console.log("start states")
        console.log(this.state)

        this.handleClick = this.handleClick.bind(this)

    }



    
    componentDidMount() {
    
    var self = this;
    console.log("Current States:")
    console.log(self.state)
    var usersRef = fire.database().ref("groups/" + this.state.item);
        usersRef.once("value").then(function(snapshot) {
        
          self.setState({
              groupBio: snapshot.val().bio,
              groupName: snapshot.val().group_name,
              groupPhoto: snapshot.val().photo
          })
        
      });
    
    }

    handleClick(){
        window.location.href = '/groups/' + this.state.item
    }

    render(){
        return(
        <Container>
        <Row>
            
            <Col></Col>
            <Col>
            <Card border = "primary" text = "dark" variant = 'light'>
            <Card.Header>{this.state.groupName}</Card.Header>
            <Card.Img src={this.state.groupPhoto} style = {{height: '250px', width: '250px'}}  />
            <Card.ImgOverlay>
            <Card.Body>
              
                
                
                <Card.Text className="justify-content-center" style={{width: '200px','max-height': '180px', 'overflow-y': 'transparent'}}>
                <br/>
                {this.state.groupBio}
                
                </Card.Text>
                <Nav.Link onClick = {this.handleClick}>Go to Page</Nav.Link>  
                        
               
            </Card.Body>
            </Card.ImgOverlay>
            </Card>
            </Col>
            <Col></Col>
        </Row>
        </Container>
        )
    }
}