import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Chat from "./Chat";
import SpotifyWidget from "./SpotifyWidget";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Logo />
            <Route path="/" component={Header} />
            <Route path="/" component={SearchBar} />
            <Route path="/" component={Chat} />
            <Route path="/" component={SpotifyWidget} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
