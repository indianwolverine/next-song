import React from "react";
import io from "socket.io-client";
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

    this.socket = io("http://localhost:8888"); // or use ngrok

    this.vote = async e => {
      const track = e.target.className;
      if (!this.state.songVotes[track]) {
        this.state.songVotes[track] = 0;
      }
      this.state.songVotes[track] += 1;

      this.socket.emit("SEND_VOTE", { songs: this.state.songVotes });
    };

    this.socket.on("RECEIVE_VOTE", data => {
      this.setState({ songVotes: data });
    });

    this.socket.on("UPDATE_QUEUE", data => {
      this.setState({ songs: [...this.state.songs, data.song] });
    });

    this.socket.on("RESET_QUEUE", () => {
      this.setState({songs: []});
    })

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

      const data = await axios(options);
      console.log(data);
    };

    this.resetQueue = async () => {
      this.socket.emit("RESET_Q");
      await axios.post("/api/resetQueue", {
        userID: this.props.userID
      });

      
    }

    this.renderQueue = () => {
      console.log(this.state.songs);
      if (this.state.songs) {
        return this.state.songs.map(track => {
          if (typeof track === "string") {
            track = JSON.parse(track);
          }

          return (
            <div key={track.uri} className="tracks">
              <img src={track.album.images[1].url} height="265" width="300" alt={track.name}/>
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
    const user = await axios.get("/api/user", {
      params: {
        userID: this.props.userID
      }
    });
    this.setState({ user: user.data, songs: user.data.queue });
  }

  render() {
    return <div>
        {this.renderQueue()}
        <button onClick={this.addToPlaylist}>
          Add Next Song to Playlist
        </button>
        <button onClick={this.resetQueue}>
          Reset Queue
        </button>
      </div>;
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
