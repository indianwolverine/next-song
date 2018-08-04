import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";

class SongQueue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      songVotes: {},
      nextSong: "",
      user: null
    };

    this.vote = async e => {
      const track = e.target.className;
      if (!this.state.songVotes[track]) {
        this.state.songVotes[track] = 0;
      }
      this.state.songVotes[track] += 1;

      this.props.socket.emit("SEND_VOTE", {
        songs: this.state.songVotes,
        room: this.props.room
      });
      await axios.post("/api/updateVotes", {
        votes: this.state.songVotes,
        userID: this.props.userID
      });
    };

    this.props.socket.on("RECEIVE_VOTE", data => {
      this.setState({ songVotes: data });
    });

    this.props.socket.on("UPDATE_QUEUE", data => {
      this.setState({ songs: [...this.state.songs, data.song] });
    });

    this.props.socket.on("RESET_QUEUE", () => {
      this.setState({ songs: [] });
    });

    this.props.socket.on("RESET_VOTES", () => {
      this.setState({ songVotes: {} });
    });

    this.addToPlaylist = async () => {
      var nextSong = "";
      var maxVotes = 0;
      for (let song in this.state.songVotes) {
        if (this.state.songVotes[song] > maxVotes) {
          nextSong = song;
          maxVotes = this.state.songVotes[song];
        }
      }
      await this.setState({ nextSong: nextSong });

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.user.accessToken}`
      };

      var options = {
        url: `https://api.spotify.com/v1/users/${this.props.userID}/playlists/${
          this.props.user.playlistID
        }/tracks?uris=${this.state.nextSong}`,
        method: "POST",
        headers: headers
      };
      console.log(this.props.user.playlistID);

      axios(options);

      this.props.socket.emit("RESET_V", { room: this.props.room });
      axios.post("/api/resetVotes", {
        userID: this.props.userID
      });

      this.resetQueue();
    };

    this.resetQueue = async () => {
      this.props.socket.emit("RESET_Q", { room: this.props.room });
      axios.post("/api/resetQueue", {
        userID: this.props.userID
      });
    };

    this.renderQueue = () => {
      console.log(this.state.songs);
      if (this.state.songs) {
        return this.state.songs.map(track => {
          if (typeof track === "string") {
            track = JSON.parse(track);
          }

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
              <p>{this.state.songVotes[track.uri]}</p>
              <button className={track.uri} onClick={this.vote}>
                Vote
              </button>
            </div>
          );
        });
      }
    };
  }

  async componentDidMount() {
    const user = await axios.post("/api/getHost", {
      userID: this.props.userID
    });
    this.setState({
      user: user.data,
      songs: user.data.queue,
      songVotes: user.data.votes ? JSON.parse(user.data.votes) : {}
    });
  }

  render() {
    return (
      <div>
        {this.renderQueue()}
        <button onClick={this.addToPlaylist}>Add Next Song to Playlist</button>
        <button onClick={this.resetQueue}>Reset Queue</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spotify: state.spotify,
    user: state.user,
    userID: state.userID,
    playlistID: state.playlistID,
    songs: state.songs
  };
}

export default connect(
  mapStateToProps,
  actions
)(SongQueue);
