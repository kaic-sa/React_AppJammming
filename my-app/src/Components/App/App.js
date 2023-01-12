import "./App.css";
import React from "react";

import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    window.addEventListener("load", () => {
      const toke = Spotify.getAccessToken();
      console.log("token carregado " + toke);
    });
  }

  search(term) {
    Spotify.search(term).then((result) => {
      this.setState({
        searchResults: result,
      });
    });
  }

  addTrack(track) {
    let checkSong = this.state.playlistTracks.some(
      (element) => element.id === track.id
    );
    if (checkSong) {
      return;
    }
    let newPlaylist = this.state.playlistTracks;
    newPlaylist.push(track);
    this.setState({
      playlistTracks: newPlaylist,
    });
  }

  removeTrack(track) {
    let lessOnePlaylist = this.state.playlistTracks.filter(
      (element) => element.id !== track.id
    );
    this.setState({
      playlistTracks: lessOnePlaylist,
    });
  }
  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((element) => element.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      alert("saved !");
      this.setState({ playlistName: "New Playlist", playlistTracks: [] });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highhlight">mmm</span>ing vamos nós
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search}></SearchBar>
          <div className="App-playlist">
            <SearchResults
              results={this.state.searchResults}
              onAdd={this.addTrack}
            ></SearchResults>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              updatePlaylistName={this.updatePlaylistName}
              onSave={this.savePlaylist}
            ></Playlist>
          </div>
        </div>
      </div>
    );
  }
}
