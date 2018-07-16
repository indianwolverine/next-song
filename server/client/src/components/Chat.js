import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: [],
      songs: {
        vote1: 0,
        vote2: 0,
        vote3: 0
      }
    };

    this.socket = io("http://localhost:8888"); // or use ngrok

    this.sendMessage = async e => {
      // e.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: "" });
    };

    this.socket.on("RECEIVE_MESSAGE", data => {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    this.vote = async e => {
      const tagClass = e.target.className;
      this.state.songs[tagClass] += 1;
    };
  }

  render() {
    return (
      <div>
        <hr />
        <div className="messages">
          {this.state.messages.map(message => {
            return (
              <div key={message.author}>
                {message.author}: {message.message}
              </div>
            );
          })}
        </div>
        <hr />

        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
          className="form-control"
        />
        <br />
        <input
          type="text"
          placeholder="Message"
          className="form-control"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <br />
        <button onClick={this.sendMessage}>Send</button>

        <div className="voting">
          <button className="vote1" onClick={this.vote}>
            Vote
          </button>
          <button className="vote2" onClick={this.vote}>
            Vote
          </button>
          <button className="vote3" onClick={this.vote}>
            Vote
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
