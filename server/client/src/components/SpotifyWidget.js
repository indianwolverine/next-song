import React from "react";
import axios from "axios";
import qs from "query-string";
import SpotifyWebApi from "spotify-web-api-js";
import { connect } from "react-redux";
import * as actions from "../actions";
import NewPlaylist from "./NewPlaylist";

class SpotifyWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: "",
      queue: [],
      user: null,
      userID: null
    };

    this.getUser = async () => {
      const user = await axios.get("/api/user", {
        params: {
          userID: this.state.userID
        }
      });
      this.setState({ user: user.data });
    };
  }

  async componentDidMount() {
    const res = qs.parse(this.props.location.pathname);
    this.setState({ userID: res.userID });

    await this.getUser();
    var spotify = new SpotifyWebApi();
    spotify.setAccessToken(this.state.user.accessToken);
    this.props.setSpotifyObject(spotify);
    this.props.setUser(this.state.user);
    this.props.setUserID(this.state.userID);
  }

  render() {
    return (
      <div>
        <hr />
        <a href="/api/login">
          <button>Login</button>
        </a>
        <NewPlaylist />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(SpotifyWidget);
