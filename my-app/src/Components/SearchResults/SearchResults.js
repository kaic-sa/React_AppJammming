import React from "react";
import { Tracklist } from "../Tracklist/Tracklist";
import "./SearchResults.css";

export class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Matchs encontrados</h2>
        <Tracklist
          tracks={this.props.results}
          onAdd={this.props.onAdd}
          isRemoval={false}
        ></Tracklist>
      </div>
    );
  }
}
