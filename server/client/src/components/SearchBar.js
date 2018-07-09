import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from "spotify-web-api-js";
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }
    
  onFormSubmit(event) {
    event.preventDefault();

    console.log(this.props.spotifyApi);
    /*.searchTracks(this.state.term)
      .then(data => (console.log(data)))*/
    }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Search for your favorite artists, albums, tracks, or playlists."
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange} 
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  };
};

function mapStateToProps(state) {
  return {
    spotifyApi: state.spotifyApi
  };
}

export default connect(mapStateToProps)(SearchBar);
