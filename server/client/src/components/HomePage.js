import React from "react";
import Logo from "./Logo";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <div className="gradient" />
        <NavBar />
        <Logo />
        <div id="color" />
        <div id="description">
          <h1 id="slogan">
            Let the people decide the <strong>#nextsong.</strong>
          </h1>
          <p>
            Next Song is a project to develop an interactive, realtime playlist
            for any social occasion or public place, where people get to suggest
            songs and vote on the next one they want to hear. Because, after
            all, shouldn't the people control (the atmosphere of) the party?
          </p>
        </div>
        <Link id="join" to="/join">
          Join a Room
        </Link>
        <a id="host" href="/api/login">
          Host a Room
        </a>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(HomePage);
