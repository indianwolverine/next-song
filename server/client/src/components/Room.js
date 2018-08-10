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
      spotify: null,
      playlistChosen: false,
      host: false
    };

    this.socket = io("http://localhost:8888"); // "http://next-song.herokuapp.com/"
    this.socket.on("ROOM_JOINED", data => {
      console.log(data);
    });

    this.playlistSet = () => {
      this.setState({ playlistChosen: true });
    };
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

    const playlists = await spotify.getUserPlaylists(user.userID, {
      limit: 3
    });
    this.props.setUserPlaylists(playlists.items);
    const data = JSON.parse(localStorage.getItem("host"));
    this.setState({ host: data.host });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="gradient">
          <NavBar />
          <div className="room">
            <div className="header">
              <h1>
                {this.state.room
                  ? this.state.room.name +
                    " hosted by " +
                    this.state.user.userID
                  : "No Name"}
              </h1>
              <Logo />

              {!this.state.host || this.state.playlistChosen ? (
                <div>
                  <SearchBar socket={this.socket} />
                  <SongQueue socket={this.socket} host={this.state.host} />
                </div>
              ) : (
                <NewPlaylist playlistSet={this.playlistSet} />
              )}
            </div>
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
