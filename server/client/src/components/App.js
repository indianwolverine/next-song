import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SpotifyWidget from "./SpotifyWidget";
import SearchBar from "./SearchBar";
import SongQueue from "./SongQueue";
import Logo from "./Logo";
import HomePage from "./HomePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <Logo />
              <Route path="/" component={SearchBar} />
            </div>
            <Route path="/" component={SongQueue} />
            {/* <Route path="/" component={Chat} /> */}
            <Route path="/" component={SpotifyWidget} />

            <Route path="/" component={HomePage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
