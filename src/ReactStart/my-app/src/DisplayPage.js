import React, {Component} from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export default class DisplayPage extends Component {

    constructor(){
        super()
    }

    render(){

        return (
            <div>

            <Nav.Link href="/CreateGroup">CreateGroup</Nav.Link>
            <Nav.Link href="/CreateEvent">CreateEvent</Nav.Link>
            <Nav.Link href="/Group">Group</Nav.Link>
            <Nav.Link href="/Homepage">Homepage</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Mainpage">Mainpage</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            <Nav.Link href="/Signup">Signup</Nav.Link>
            <Nav.Link href="/LoginPage">LoginPage</Nav.Link>
            <Nav.Link href="/Account">Account</Nav.Link>
            <Nav.Link href="/EditProfile">Account</Nav.Link>
    
            </div>
        )

    }
}