import React from "react";
import axios from "axios";
import Logo from "./Logo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import SpotifyWebApi from "spotify-web-api-js";
import * as actions from "../actions";

class HostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room: "",
      password: "",
      userID: null,
      user: null
    };

    this.getUser = async () => {
      const user = await axios.get("/api/user", {
        params: {
          userID: this.state.userID
        }
      });
      this.setState({ user: user.data });
    };

    this.onRoomChange = e => {
      this.setState({ room: e.target.value });
    };

    this.onPasswordChange = e => {
      this.setState({ password: e.target.value });
    };

    this.submit = () => {
      axios.post("/api/createRoom", {
        userID: this.state.userID,
        room: this.state.room,
        password: this.state.password
      });

      this.props.history.push("/nextsong");
    };
  }

  async componentDidMount() {
    const res = qs.parse(window.location.pathname);
    console.log(res.userID);
    this.setState({ userID: res.userID });
    const user = await axios.post("/api/getHost", {
      userID: res.userID
    });
    console.log(user);

    var spotify = new SpotifyWebApi();
    spotify.setAccessToken(user.data.accessToken);
    this.props.setSpotifyObject(spotify);
    this.props.setUser(user.data);
    this.props.setUserID(user.data.userID);
    this.props.setPlaylist({ playlist: user.data.playlistID });
    localStorage.setItem("user", JSON.stringify(user.data));
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
          placeholder="Set Room Password"
          className="form-control"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <button onClick={this.submit}>Host Room</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userID,
    user: state.user,
    spotify: state.spotify
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(HostPage)
);
