import React from "react";
import LogoImg from "../assets/next-song-logo.svg";

class Logo extends React.Component {
  render() {
    return (
      <div id="logo">
        <img width="300px" height="300px" src={LogoImg} />
      </div>
    );
  }
}

export default Logo;
