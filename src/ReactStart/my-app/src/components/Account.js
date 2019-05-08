import React, {Component} from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import fire from '../fire';

class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: "Checking Log In State..."
    }
  }

  getData(){
    setTimeout(() => {
      
    }, 100)
  }

  componentDidMount(){
    var self = this;
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({
          data: 'Someone is logged in'
        })
      }
      else {
        self.setState({
          data: "No one is logged in"
        })
      }
    });
  }

  

  render() {
    return(
      <div>
      {this.state.data}
      <button onClick={goToMainMenu}>Return to Main Menu</button>
    </div>
    )
  }
}
function goToMainMenu(){
  window.location = "/main";
}
export default Account;