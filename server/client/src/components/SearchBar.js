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

    this.search = e => {
      console.log(this.state.term);
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
