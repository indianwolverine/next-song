import React, { Component } from "react";
import Logo from "./Logo";
import "../styles/grid.css";
import MenuIcon from "./MenuIcon";
import Guitars from "../assets/guitars.jpg";

class HomePage extends Component {
  render() {
    return (
      <div className="wrapper">
        <img id="guitars" src={Guitars} alt="guitars" />
        <MenuIcon />
        <Logo />
        <div id="color" />
        <div id="description">
          <h1 id="slogan">
            Let the people decide the <strong>#nextsong.</strong>
          </h1>
          <p>
            Have you ever been at a party and questioned the musical tastes of
            the secret cult in charge of the playlist? Or maybe you've been
            relaxing at your favorite coffee shop, listening to smooth jazz,
            when suddenly Alt-J interrupts Coltrane? Next Song is a project to
            develop an interactive, realtime playlist for any social occasion or
            public place, where people get to suggest songs and vote on the next
            one they want to hear. Because, after all, shouldn't the people
            control (the atmosphere of) the party?
          </p>
        </div>
        <button id="join">Join a Room</button>
        <button id="host">Host a Room</button>
      </div>
    );
  }
}

export default HomePage;
