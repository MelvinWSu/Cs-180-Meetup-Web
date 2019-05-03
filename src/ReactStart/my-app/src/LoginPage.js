import React, { Component } from 'react';
import {Navbar, Nav, Row, Col, Card, Form, FormControl, Button} from 'react-bootstrap';

function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

export default class LoginPage extends Component{

    constructor(props) {
        /* 1. Initialize Ref */
        super(props)

        //profile/firebase variables
        this.email = React.createRef(); 
        this.password = React.createRef();
  
        //button variables
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isLoading: false,
          };
     }
   
     handleEmailChange() {
        /* 3. Get Ref Value here (or anywhere in the code!) */
        
        const value = this.email.current.value
        console.log(value)
     }

     handlePasswordChange(){
         const value = this.password.current.value
         console.log(value)
     }
     
     handleClick(){
        this.setState({ isLoading: true }, () => {
            simulateNetworkRequest().then(() => {
              this.setState({ isLoading: false });
            });
          });

        console.log("email: ")
        console.log(this.email.current.value)
        console.log("password:")
        console.log(this.password.current.value)
    }

    render() {
       /* 2. Attach Ref to FormControl component */
       return (
         <div>
             <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">MeetUp</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
                <Nav.Link color = "primary"   href="/">Home</Nav.Link>
                <Nav.Link href="/">Features</Nav.Link>
            </Form>
           

            </Navbar>

            <Row>
            <Col> </Col>
            <Col xs={6}>

            <br/>
            <Card>
            
                <Form>
                <Form.Group>
                <Form.Label>Email address</Form.Label>
                <FormControl ref={this.email} type="email" onChange={() => this.handleEmailChange()} />
                <Form.Text className = "text-muted">
                    Checking if this actually works.
                </Form.Text>
                </Form.Group>
                
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control ref = {this.password} type = "email" onChange = {() => this.handlePasswordChange()} />
                </Form.Group>
                <Button
                variant="primary"
                disabled={this.state.isLoading}
                onClick={!this.state.isLoading ? this.handleClick : null}
                >
                    {this.state.isLoading ? 'Loading…' : 'Click to load'}
                </Button>
            </Form>
            </Card>
            </Col>
            <Col></Col>
            </Row>
         </div>
       )
     }
}