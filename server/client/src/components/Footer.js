import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <a href="https://aditya-srivastava.herokuapp.com/" target="_blank">
          © Aditya Srivastava |{" "}
          <a href="https://github.com/rakechill" target="_blank">
            Rachel Gregory 2018
          </a>
        </a>
      </div>
    );
  }
}

export default Footer;
