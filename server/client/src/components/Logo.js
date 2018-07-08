import React from "react";
import LogoImg from "../assets/next-song-logo.svg";

class Logo extends React.Component {
  render() {
    return (
      <div>
        <img width="100px" height="100px" src={LogoImg} />
      </div>
    );
  }
}

export default Logo;
