import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

class SongQueue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      songVotes: {},
      nextSong: "",
      user: null,
      voted: false
    };

    this.props.socket.on("RECEIVE_VOTE", data => {
      this.setState({ songVotes: data });
    });

    this.props.socket.on("UPDATE_QUEUE", data => {
      console.log(this.state);
      console.log(this.props);
      this.props.addSongToQueue(data.song);
      // this.setState({ songs: [...this.props.room.queue, ...this.props.songs] });
    });

    this.props.socket.on("RESET_QUEUE", () => {
      this.setState({ songs: [] });
    });

    this.props.socket.on("RESET_VOTES", () => {
      this.setState({ songVotes: {}, voted: false });
    });

    this.vote = async e => {
      if (!this.state.voted) {
        const track = e.target.id;
        if (!this.state.songVotes[track]) {
          this.state.songVotes[track] = 0;
        }
        this.state.songVotes[track] += 1;

        this.props.socket.emit("SEND_VOTE", {
          songs: this.state.songVotes,
          room: this.props.room.name
        });

        this.setState({ voted: true });

        await axios.post("/api/updateVotes", {
          votes: this.state.songVotes,
          room: this.props.room.name
        });
      }
    };

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
        url: `https://api.spotify.com/v1/users/${
          this.props.user.userID
        }/playlists/${this.props.playlistID}/tracks?uris=${
          this.state.nextSong
        }`,
        method: "POST",
        headers: headers
      };

      axios(options);

      this.resetVotes();
      this.resetQueue();
    };

    this.resetVotes = async () => {
      this.props.socket.emit("RESET_V", { room: this.props.room.name });
      axios.post("/api/resetVotes", {
        room: this.props.room.name
      });
    };

    this.resetQueue = async () => {
      this.props.socket.emit("RESET_Q", { room: this.props.room.name });
      axios.post("/api/resetQueue", {
        room: this.props.room.name
      });
    };

    this.renderQueue = () => {
      console.log(this.state);
      console.log(this.props);
      if (this.state.songs) {
        // implement deduplication logic here

        return this.state.songs.map(track => {
          if (typeof track === "string") {
            track = JSON.parse(track);
          }

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
                <ListItemText primary={this.state.songVotes[track.uri]} />
                <button id={track.uri} className="buttons" onClick={this.vote}>
                  Vote
                </button>
              </ListItem>
              <Divider />
            </div>
          );
        });
      }
    };
  }

  componentDidMount() {
    this.setState({
      songs: this.props.room.queue,
      songVotes: this.props.room.votes ? JSON.parse(this.props.room.votes) : {}
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      songs: [...nextProps.room.queue, ...nextProps.songs],
      songVotes: nextProps.room.votes ? JSON.parse(nextProps.room.votes) : {}
    });
  }

  render() {
    return (
      <div>
        <h3>Song Queue</h3>
        <List className="tracks">{this.renderQueue()}</List>
        {this.props.host ? (
          <div>
            <button className="buttons" onClick={this.addToPlaylist}>
              Add Next Song to Playlist
            </button>
            <button className="buttons" onClick={this.resetQueue}>
              Reset Queue
            </button>
          </div>
        ) : (
          ""
        )}
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
    playlistID: state.playlistID
  };
}

export default connect(
  mapStateToProps,
  actions
)(SongQueue);
