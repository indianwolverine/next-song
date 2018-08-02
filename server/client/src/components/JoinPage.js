import React from "react";
import Logo from "./Logo";
import { connect } from "react-redux";
import * as actions from "../actions";

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

    this.submit = async e => {};
  }

  render() {
    return (
      <div>
        <Logo />
        <input
          placeholder="Room Name"
          className="form-control"
          value={this.state.room}
          onChange={this.onRoomChange}
        />
        <input
          placeholder="Room Password"
          className="form-control"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <input
          placeholder="Create a Username"
          className="form-control"
          value={this.state.username}
          onChange={this.onUserNameChange}
        />
        <button onClick={this.submit}>Join Room</button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(JoinPage);
