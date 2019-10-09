import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Restaurants from "./components/Restaurants";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Header</header>
        <Restaurants />
      </div>
    );
  }
}

export default App;
