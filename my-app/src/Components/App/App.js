import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { SearchBar } from "../SearchBar/SearchBar";
//import App-playlist  from
//import App-searchresults from

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highhlight">mmm</span>ing vamos nós
        </h1>
        <div className="App">
          <div className="App-searchbar"></div>
          <div className="App-playlist">
            <div className="App-searchresults"></div>
          </div>
        </div>
      </div>
    );
  }
}
