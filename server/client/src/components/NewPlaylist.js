import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);

    this.createPlaylist = async () => {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.user.accessToken}`
      };

      const dataString =
        '{"name":"Next Song","description":"Next Song Playlist","public":false}';

      const options = {
        url: `https://api.spotify.com/v1/users/${this.props.userID}/playlists`,
        method: "POST",
        headers: headers,
        data: dataString
      };

      const data = await axios(options);

      this.props.setPlaylist(data.data.id);
    };
  }
  render() {
    return (
      <div>
        <button onClick={this.createPlaylist}>Create Playlist</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spotify: state.spotify,
    userID: state.userID,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  actions
)(NewPlaylist);
