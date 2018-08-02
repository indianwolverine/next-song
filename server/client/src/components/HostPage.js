import React from "react";
import Logo from "./Logo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";

class HostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room: "",
      password: ""
    };

    this.onRoomChange = e => {
      this.setState({ room: e.target.value });
    };

    this.onPasswordChange = e => {
      this.setState({ password: e.target.value });
    };
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
          placeholder="Set Room Password"
          className="form-control"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <button onClick={this.submit}>Host Room</button>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(HostPage)
);
