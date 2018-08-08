import React from "react";
import Logo from "./Logo";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";
import NavBar from "./NavBar";
import TextField from "@material-ui/core/TextField";

class JoinPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room: "",
      password: "",
      username: ""
    };

    this.onRoomChange = e => {
      this.setState({ room: e.target.value });
    };

    this.onPasswordChange = e => {
      this.setState({ password: e.target.value });
    };

    this.onUserNameChange = e => {
      this.setState({ username: e.target.value });
    };

    this.submit = async e => {
      const res = await axios.post("/api/findRoomAndHost", {
        room: this.state.room,
        password: this.state.password
      });

      const room = res.data.room;
      const host = res.data.user;

      if (host && room) {
        localStorage.setItem("user", JSON.stringify(host));
        localStorage.setItem("room", JSON.stringify(room));
        this.props.history.push("/nextsong");
      } else {
        alert("Room not found");
      }
    };
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
              id="Room Password"
              label="Room Password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              type="password"
              margin="normal"
            />
            <TextField
              id="Username"
              label="Create Username"
              value={this.state.username}
              onChange={this.onUserNameChange}
              margin="normal"
            />
            <button className="buttons" onClick={this.submit}>
              Join Room
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(JoinPage);
