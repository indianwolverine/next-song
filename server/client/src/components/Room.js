import React from "react";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import io from "socket.io-client";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NewPlaylist from "./NewPlaylist";
import SongQueue from "./SongQueue";
import NavBar from "./NavBar";
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

    var spotify = new SpotifyWebApi();
    spotify.setAccessToken(user.accessToken);
    this.props.setSpotifyObject(spotify);
    this.setState({ spotify: spotify });

    this.props.setRoom(room);
    this.props.setUser(user);
    this.props.setUserID(user.userID);
    this.props.setSpotifyObject(spotify);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="gradient">
          <NavBar />
          <h1>{this.state.room ? this.state.room.name : "No Name"}</h1>
          <div className="room">
            <div className="header">
              <Logo />
              <SearchBar socket={this.socket} />
              {/* <NewPlaylist /> */}
            </div>
            <SongQueue socket={this.socket} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    room: state.room,
    user: state.user,
    spotify: state.spotify
  };
}

export default connect(
  mapStateToProps,
  actions
)(Room);
