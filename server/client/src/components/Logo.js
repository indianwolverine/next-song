import React from "react";
import LogoImg from "../assets/next-song-logo.svg";

class Logo extends React.Component {
  render() {
    return (
      <div id="logo">
        <img width="200px" height="200px" src={LogoImg} alt="next-song"/>
      </div>
    );
  }
}

export default Logo;
