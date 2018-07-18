import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Chat from "./Chat";
import SpotifyWidget from "./SpotifyWidget";
import SearchBar from "./SearchBar";
import SongQueue from "./SongQueue";
import Logo from "./Logo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <Logo />
              <Route path="/" component={SearchBar} />
              <Route path="/" component={SongQueue} />
            </div>
            <Route path="/" component={Chat} />
            <Route path="/" component={SpotifyWidget} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
