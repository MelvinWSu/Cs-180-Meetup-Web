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
              groupBio: snapshot.val().group_bio,
              groupName: snapshot.val().group_name,
              groupPhoto: snapshot.val().photo
          })
        
      });
    
    }

    handleClick(){
        window.location.href = '/group/' + this.state.item
    }

    render(){
        return(
            
            <Row>
            <Col></Col>
            <Col>
            <Card className="border-primary" text="dark" variant='light' style={{ width: '300px'}}>
            <Card.Header className="border-primary"><strong>{this.state.groupName}</strong></Card.Header>
            <Card.Img src={this.state.groupPhoto} style = {{height: '300px', width: '300px', "maxWidth" : '300px', "maxHeight": '300px', opacity: '0.5'}}  />
            <Card.ImgOverlay>
            <Card.Body>
                <Col></Col>
                <Col>
                <Card.Text>
                <br/>
                <strong>{this.state.groupBio}</strong>               
                </Card.Text>
                </Col>
                <Col></Col>
                <Nav.Link className="groupcard_link" onClick={this.handleClick}><strong>Go to Page</strong></Nav.Link>  
            </Card.Body>
            </Card.ImgOverlay>
            </Card>
            </Col>
            <Col></Col>
            </Row>
        )
    }
}