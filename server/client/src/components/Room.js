import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NewPlaylist from "./NewPlaylist";
import Spotify from "./Spotify";
import SongQueue from "./SongQueue";
import * as actions from "../actions";

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room: ""
    };
  }

  async componentDidMount() {
    const room = await axios.post("/api/getRoom", {
      host: this.props.userID
    });
    this.setState({ room: room.data.name });
    this.props.setRoom(room.data);
  }

  render() {
    return (
      <div className="room">
        <div className="header">
          <h1>{this.state.room}</h1>
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
    room: state.room,
    userID: state.userID
  };
}

export default connect(
  mapStateToProps,
  actions
)(Room);
