import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Chat from './Chat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Chat />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
