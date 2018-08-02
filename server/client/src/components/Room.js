import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NewPlaylist from "./NewPlaylist";
import Spotify from "./Spotify";
import SongQueue from "./SongQueue";

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.room = () => {
      console.log(this.props.room);
    };
  }

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
        <button onClick={this.room}>Room</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    room: state.room
  };
}

export default withRouter(connect(mapStateToProps)(Room));
