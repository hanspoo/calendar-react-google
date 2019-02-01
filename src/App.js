import React, { Component } from "react";
import "./App.css";
import You from "./You";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <You />
        </header>
      </div>
    );
  }
}

export default App;
