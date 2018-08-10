import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";
import NextSong from "../assets/next-song-logo.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistName: "",
      playlistDescription: "",
      playlists: null
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
      this.props.playlistSet();
    };

    this.onNameChange = e => {
      this.setState({ playlistName: e.target.value });
    };

    this.onDescriptionChange = e => {
      this.setState({ playlistDescription: e.target.value });
    };

    this.setPlaylist = e => {
      const playlist = e.target.id;
      this.props.setPlaylist({
        playlist: playlist,
        room: this.props.room.name
      });

      this.props.playlistSet();
    };

    this.renderPlaylists = () => {
      console.log(this.props.playlists);
      if (this.props.playlists) {
        return this.props.playlists.map(playlist => {
          return (
            <div key={playlist.id}>
              <ListItem>
                {playlist.images[0] ? (
                  <img
                    src={playlist.images[0].url}
                    height="64"
                    width="64"
                    alt={playlist.name}
                  />
                ) : (
                  <img
                    src={NextSong}
                    height="64"
                    width="90"
                    alt={playlist.name}
                  />
                )}
                <ListItemText primary={playlist.name} />
                <button
                  id={playlist.id}
                  className="buttons"
                  onClick={this.setPlaylist}
                >
                  Set Playlist
                </button>
              </ListItem>
              <Divider />
            </div>
          );
        });
      }
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
          <button className="buttons form-button" onClick={this.createPlaylist}>
            Create Playlist
          </button>
          <div className="playlists">
            <List>{this.renderPlaylists()}</List>
          </div>
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
    songs: state.songs,
    playlists: state.playlists
  };
}

export default connect(
  mapStateToProps,
  actions
)(NewPlaylist);
