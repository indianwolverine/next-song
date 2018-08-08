import React from "react";
import { FaGithub } from "react-icons/fa/";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="title">
          <Link to="/">next song</Link>
        </div>
        <div className="github">
          <a
            href="https://github.com/indianwolverine/next-song"
            target="_blank"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;
