import React from "react";
import axios from "axios";
import Logo from "./Logo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import * as actions from "../actions";
import NavBar from "./NavBar";
import TextField from "@material-ui/core/TextField";

class HostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room: "",
      password: "",
      hostRooms: null,
      userID: null,
      user: null
    };

    this.getUser = async () => {
      const user = await axios.get("/api/user", {
        params: {
          userID: this.state.userID
        }
      });
      this.setState({ user: user.data });
    };

    this.onRoomChange = e => {
      this.setState({ room: e.target.value });
    };

    this.onPasswordChange = e => {
      this.setState({ password: e.target.value });
    };

    this.hostRoom = async () => {
      const room = await axios.post("/api/createRoom", {
        userID: this.state.userID,
        room: this.state.room,
        password: this.state.password
      });
      localStorage.setItem("room", JSON.stringify(room.data));

      this.props.history.push("/nextsong");
    };

    this.renderHostRooms = () => {
      if (this.state.rooms) {
        return this.state.rooms.map(room => {
          return (
            <div>
              <h2>{room.name}</h2>
              <button
                id={JSON.stringify(room)}
                className="buttons"
                onClick={this.joinRoom}
              >
                Join Room
              </button>
            </div>
          );
        });
      }
    };

    this.joinRoom = e => {
      localStorage.setItem("room", e.target.id);
      this.props.history.push("/nextsong");
    };
  }

  async componentDidMount() {
    const res = qs.parse(window.location.pathname);
    console.log(res.userID);
    this.setState({ userID: res.userID });
    const user = await axios.post("/api/getHost", {
      userID: res.userID
    });

    const rooms = await axios.post("/api/userRooms", {
      userID: res.userID
    });

    localStorage.setItem("user", JSON.stringify(user.data));
    this.setState({ rooms: rooms.data });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="gradient">
          <NavBar />

          <Logo />
          <div className="form-before-room">
            <TextField
              required
              id="Room Name"
              label="Room Name"
              value={this.state.room}
              onChange={this.onRoomChange}
              margin="normal"
            />
            <TextField
              required
              id="Set Password"
              label="Set Room Password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              type="password"
              margin="normal"
            />
            <button className="buttons form-button" onClick={this.hostRoom}>
              Host Room
            </button>
            {this.renderHostRooms()}
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
    spotify: state.spotify
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(HostPage)
);
