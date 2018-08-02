import React from "react";
import Logo from "./Logo";
import Guitars from "../assets/guitars.jpg";

class HomePage extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Logo />
        <div id="color" />
        <div id="description">
          <h1 id="slogan">
            Let the people decide the <strong>#nextsong.</strong>
          </h1>
          <p>
            Next Song is a project to
            develop an interactive, realtime playlist for any social occasion or
            public place, where people get to suggest songs and vote on the next
            one they want to hear. Because, after all, shouldn't the people
            control (the atmosphere of) the party?
          </p>
        </div>
        <button id="join">Join a Room</button>
        <button id="host">
          <a href="/api/login">Host a Room</a>
        </button>
      </div>
    );
  }
}

export default HomePage;
