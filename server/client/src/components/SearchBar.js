import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      playing: false,
      tracks: [],
      trackInfo: {},
      spotify: ""
    };

    this.onInputChange = e => {
      this.setState({ term: e.target.value });
    };

    this.search = async e => {
      const data = await this.props.spotify.searchTracks(this.state.term, {
        limit: 3
      });
      this.setState({ tracks: data.tracks.items });
      for (let track of data.tracks.items) {
        this.state.trackInfo[track.uri] = track;
      }
    };

    this.togglePlayback = async e => {
      console.log(this.props);

      if (this.state.playing) {
        this.props.spotify.pause({});
        this.setState({ playing: false });
      } else {
        this.props.spotify.play({});
        this.setState({ playing: true });
      }
    };
    this.renderTracks = () => {
      if (this.state.tracks) {
        return this.state.tracks.map(track => {
          return (
            <div key={track.uri}>
              <ListItem>
                <img
                  src={track.album.images[2].url}
                  height="64"
                  width="64"
                  alt={track.name}
                />
                <ListItemText
                  primary={track.name}
                  secondary={track.artists[0].name}
                />
                <button
                  id={track.uri}
                  className="buttons"
                  onClick={this.addToQueue}
                >
                  +
                </button>
              </ListItem>
              <Divider />
            </div>
          );
        });
      }
    };

    this.addToQueue = async e => {
      const track = e.target.id;
      const trackData = this.state.trackInfo[track];
      this.props.addSongToQueue(trackData);
      this.props.socket.emit("UPDATE_Q", {
        song: trackData,
        room: this.props.room.name
      });

      await axios.post("/api/addToQueue", {
        song: trackData,
        room: this.props.room.name
      });
    };
  }

  render() {
    return <div>
        <TextField id="Search for your favorite songs" label="Search for your favorite songs" value={this.state.term} onChange={this.onInputChange} margin="normal" />
        <span className="input-group-btn">
          <button onClick={this.search} className="btn btn-secondary buttons">
            Search
          </button>
          <button onClick={this.togglePlayback} className="btn btn-secondary buttons">
            Play/Pause
          </button>
          <h3>Search Results</h3>
          <List className="tracks">{this.renderTracks()}</List>
        </span>
      </div>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    spotify: state.spotify,
    room: state.room
  };
}

export default connect(
  mapStateToProps,
  actions
)(SearchBar);
