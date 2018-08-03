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
      room: "",
      user: null,
      spotify: null
    };

    this.socket = io("http://localhost:8888"); // or use ngrok
    this.socket.on("ROOM_JOINED", data => {
      console.log(data);
    });
  }

  async componentDidMount() {
    const room = await axios.post("/api/getRoom", {
      host: this.props.userID
    });
    this.setState({ room: room.data.name });
    this.socket.emit("JOIN_ROOM", {
      room: room.data.name
    });
    this.props.setRoom(room.data);

    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
    console.log(this.state.user);

    var spotify = new SpotifyWebApi();
    spotify.setAccessToken(this.state.user.accessToken);
    this.props.setSpotifyObject(spotify);
    this.setState({ spotify: spotify });

    console.log(this.state);
  }

  render() {
    return (
      <div className="room">
        <div className="header">
          <h1>{this.state.room}</h1>
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
