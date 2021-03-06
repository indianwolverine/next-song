import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Room from "./Room";
import JoinPage from "./JoinPage";
import HostPage from "./HostPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/nextsong" component={Room} />
            <Route path="/join" component={JoinPage} />
            <Route path="/host" component={HostPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
