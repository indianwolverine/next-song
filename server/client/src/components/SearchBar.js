import React, { Component } from "react";
import { connect } from "react-redux";
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };

    this.onInputChange = e => {
      this.setState({ term: e.target.value });
      console.log(e.target.value);
    };

    this.search = async e => {
      // const data = await this.props.spotify.getUserPlaylists();
      // console.log(data);
      // const data = await this.props.spotify.getMyDevices();
      // console.log(data.devices[0].id);
      // const data = await this.props.spotify.getMyCurrentPlaybackState();
      // console.log(data);
      this.props.spotify.play({});
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
            Submit
          </button>
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
