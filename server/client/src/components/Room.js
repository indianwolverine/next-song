import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-js";
import io from "socket.io-client";
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
      room: null,
      user: null,
      spotify: null
    };

    this.socket = io("http://localhost:8888"); // or use ngrok
    this.socket.on("ROOM_JOINED", data => {
      console.log(data);
    });
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const room = JSON.parse(localStorage.getItem("room"));
    console.log(user);
    console.log(room);
    this.socket.emit("JOIN_ROOM", { room: room.name });
    this.setState({ user: user, room: room });

    this.props.setRoom(room);

    var spotify = new SpotifyWebApi();
    spotify.setAccessToken(user.accessToken);
    this.props.setSpotifyObject(spotify);
    this.setState({ spotify: spotify });
  }

  render() {
    return (
      <div className="room">
        <div className="header">
          <h1>{this.state.room ? this.state.room.name : "No Name"}</h1>
          <Logo />
          <SearchBar
            user={this.state.user}
            spotify={this.state.spotify}
            room={this.state.room}
            socket={this.socket}
          />
          <NewPlaylist
            user={this.state.user}
            spotify={this.state.spotify}
            room={this.state.room}
          />
        </div>
        <SongQueue
          user={this.state.user}
          spotify={this.state.spotify}
          room={this.state.room}
          socket={this.socket}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
    userID: state.userID,
    spotify: state.spotify
  };
}

export default connect(
  mapStateToProps,
  actions
)(Room);
