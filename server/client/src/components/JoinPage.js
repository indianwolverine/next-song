import React from "react";
import Logo from "./Logo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import * as actions from "../actions";

class JoinPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room: "",
      password: "",
      username: ""
    };

    this.onRoomChange = e => {
      this.setState({ room: e.target.value });
    };

    this.onPasswordChange = e => {
      this.setState({ password: e.target.value });
    };

    this.onUserNameChange = e => {
      this.setState({ username: e.target.value });
    };

    this.submit = async e => {
      const host = await axios.post("/api/findRoom", {
        room: this.state.room,
        password: this.state.password
      });

      const user = JSON.parse(host.data.userInfo);

      var spotify = new SpotifyWebApi();
      spotify.setAccessToken(host.data.accessToken);
      this.props.setSpotifyObject(spotify);
      this.props.setUser(user);
      this.props.setUserID(host.data.userID);
      this.props.setPlaylist({ playlist: host.data.playlistID });

      this.props.history.push("/nextsong");
    };
  }

  render() {
    return (
      <div>
        <Logo />
        <input
          placeholder="Room Name"
          className="form-control"
          value={this.state.room}
          onChange={this.onRoomChange}
        />
        <input
          placeholder="Room Password"
          className="form-control"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <input
          placeholder="Create a Username"
          className="form-control"
          value={this.state.username}
          onChange={this.onUserNameChange}
        />
        <button onClick={this.submit}>Join Room</button>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(JoinPage)
);
