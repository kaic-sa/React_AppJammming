import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: "name1", artist: "artist1", album: "album1", id: 1 },
        { name: "name1", artist: "artist1", album: "album1", id: 2 },
        { name: "name1", artist: "artist1", album: "album1", id: 3 },
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        { name: "name1", artist: "artist1", album: "album1", id: 4 },
        { name: "name1", artist: "artist1", album: "album1", id: 5 },
        { name: "name1", artist: "artist1", album: "album1", id: 6 },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    console.log(term);
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

  savePlaylist(playlistTracks) {
    const trackURIs = [];
    playlistTracks.map((element) =>
      trackURIs.push("spotify:track:" + element.id)
    );
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
