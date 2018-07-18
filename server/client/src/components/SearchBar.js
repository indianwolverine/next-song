import React, { Component } from "react";
import { connect } from "react-redux";
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "", playing: false, tracks: [] };

    this.onInputChange = e => {
      this.setState({ term: e.target.value });
      console.log(e.target.value);
    };

    this.search = async e => {
      const data = await this.props.spotify.searchTracks(this.state.term, {
        limit: 2
      });
      this.setState({ tracks: data.tracks.items });
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
      console.log(this.state.tracks);
      if (this.state.tracks) {
        return this.state.tracks.map(track => {
          return (
            <div id={track.uri} className="tracks">
              <img src={track.album.images[1].url} height="265" width="300" />
              <p>{track.name}</p>
              <p>{track.artists[0].name}</p>
            </div>
          );
        });
      }
    };
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
          {this.renderTracks()}
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spotify: state.spotify
  };
}

export default connect(mapStateToProps)(SearchBar);
