import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import io from "socket.io-client";
import * as actions from "../actions";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "", playing: false, tracks: [], trackInfo: {} };
    this.socket = io("http://localhost:8888");

    this.onInputChange = e => {
      this.setState({ term: e.target.value });
    };

    this.search = async e => {
      const data = await this.props.spotify.searchTracks(this.state.term, {
        limit: 2
      });
      this.setState({ tracks: data.tracks.items });
      for (let track of data.tracks.items) {
        this.state.trackInfo[track.uri] = track;
      }
    };

    this.togglePlayback = async e => {
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
            <div key={track.uri} className="tracks">
              <img
                src={track.album.images[1].url}
                height="265"
                width="300"
                alt={track.name}
              />
              <p className="title">{track.name}</p>
              <p className="artist">{track.artists[0].name}</p>
              <button className={track.uri} onClick={this.addToQueue}>
                Add To Queue
              </button>
            </div>
          );
        });
      }
    };

    this.addToQueue = async e => {
      const track = e.target.className;
      const trackData = this.state.trackInfo[track];
      this.props.addSongToQueue(trackData);
      this.socket.emit("UPDATE_Q", { song: trackData });

      await axios.post("/api/addToQueue", {
        song: trackData,
        userID: this.props.userID
      });
    };

    this.joinRoom = () => {
      this.socket.emit("JOIN_ROOM", {
        room: this.props.room
      });
    };

    this.socket.on("ROOM_JOINED", data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <input
          placeholder="Search for your favorite artists, albums, tracks, or playlists."
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button onClick={this.search} className="btn btn-secondary">
            Search
          </button>
          <hr />
          <button onClick={this.togglePlayback} className="btn btn-secondary">
            Play/Pause
          </button>
          <button onClick={this.joinRoom} className="btn btn-secondary">
            Join Room
          </button>
          {this.renderTracks()}
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spotify: state.spotify,
    userID: state.userID,
    room: state.room
  };
}

export default connect(
  mapStateToProps,
  actions
)(SearchBar);
