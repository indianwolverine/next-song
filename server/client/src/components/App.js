import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Tournaments from './Tournaments';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/tournaments" component={Tournaments} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
