import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Chat from "./Chat";
import SCWidget from "./SCWidget";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Chat />
            <SCWidget />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
