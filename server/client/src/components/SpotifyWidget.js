import React from "react";
import axios from "axios";
import qs from "query-string";
import parse from "url-parse";
import SpotifyWebApi from "spotify-web-api-js";
import { connect } from "react-redux";
import * as actions from "../actions";

class SpotifyWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src:
        "https://open.spotify.com/embed?uri=spotify:user:invictusforever:playlist:2lW5hDsiy4vJj0AOfZlh9R",
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
    // spotify.searchTracks("Love").then(
    //   function(data) {
    //     console.log('Search by "Love"', data);
    //   },
    //   function(err) {
    //     console.error(err);
    //   }
    // );
  }

  render() {
    return (
      <div>
        {/* <iframe
          src={this.state.src}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        /> */}
        <hr />
        <a href="/api/login">
          <button>Login</button>
        </a>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(SpotifyWidget);
