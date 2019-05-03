import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Mainpage from "./components/Mainpage";
import Profile from "./components/Profile";
import Group from "./components/Group";
import CreateGroup from "./components/CreateGroup";
//import CreateEvent from "./components/CreateEvent";*/

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <Route path="/" component={Homepage} exact />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/main" component={Mainpage} />
          <Route path="/profile" component={Profile} />
          <Route path="/group" component={Group} />
          <Route path="/create_group" component={CreateGroup} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
