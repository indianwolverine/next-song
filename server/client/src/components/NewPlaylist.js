import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";
import TextField from "@material-ui/core/TextField";

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistName: "",
      playlistDescription: ""
    };

    this.createPlaylist = async () => {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.user.accessToken}`
      };

      const dataObject = {
        name: this.state.playlistName,
        description: this.state.playlistDescription,
        public: false
      };
      const dataString = JSON.stringify(dataObject);

      const options = {
        url: `https://api.spotify.com/v1/users/${
          this.props.user.userID
        }/playlists`,
        method: "POST",
        headers: headers,
        data: dataString
      };

      const data = await axios(options);

      this.props.setPlaylist({
        playlist: data.data.id,
        room: this.props.room.name
      });

      this.setState({ playlistName: "", playlistDescription: "" });
    };

    this.onNameChange = e => {
      this.setState({ playlistName: e.target.value });
    };

    this.onDescriptionChange = e => {
      this.setState({ playlistDescription: e.target.value });
    };
  }
  render() {
    return (
      <div>
        <div className="form-before-room">
          <TextField
            required
            id="Playlist Name"
            label="Playlist Name"
            value={this.state.playlistName}
            onChange={this.onNameChange}
            margin="normal"
          />
          <TextField
            required
            id="Playlist Description"
            label="Playlist Description"
            value={this.state.playlistDescription}
            onChange={this.onDescriptionChange}
            margin="normal"
          />
          <button className="buttons" onClick={this.createPlaylist}>
            Create Playlist
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userID,
    user: state.user,
    spotify: state.spotify,
    room: state.room,
    songs: state.songs
  };
}

export default connect(
  mapStateToProps,
  actions
)(NewPlaylist);
