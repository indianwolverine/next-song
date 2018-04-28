import React from 'react';
import io from 'socket.io-client';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: []
    };

    this.socket = io('http://008df2df.ngrok.io');

    this.sendMessage = e => {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: '' });
    };

    this.socket.on('RECEIVE_MESSAGE', data => {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
  }

  render() {
    return (
      <div>
        <hr />
        <div className="messages">
          {this.state.messages.map(message => {
            return (
              <div>
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
      </div>
    );
  }
}

export default Chat;
