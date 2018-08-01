import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NewPlaylist from "./NewPlaylist";
import Spotify from "./Spotify";
import SongQueue from "./SongQueue";

class Room extends React.Component {
  render() {
    return (
      <div className="room">
        <div className="header">
          <Logo />
          <SearchBar />
          <NewPlaylist />
        </div>
        <SongQueue />
        <Spotify />
      </div>
    );
  }
}

export default Room;
