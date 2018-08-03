import React from "react";
import Logo from "./Logo";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <div id="gradient" />
        {/*<img id="back" src={Background} alt=""/>*/}
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
        <Link to="/join">
          <button id="join">Join</button>
        </Link>
        <a href="/api/login">
          <button id="host">Host</button>
        </a>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(HomePage);
