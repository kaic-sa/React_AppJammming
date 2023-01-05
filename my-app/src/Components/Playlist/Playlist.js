import React from "react";
import "./Playlist.css";
import { Tracklist } from "../Tracklist/Tracklist";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
    const name = e.target.value;
    this.props.updatePlaylistName(name);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" onChange={this.handleNameChange} />
        <Tracklist
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        ></Tracklist>
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}
