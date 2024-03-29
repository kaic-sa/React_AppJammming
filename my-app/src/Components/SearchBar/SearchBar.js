import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  search() {
    this.props.onSearch(this.state.term);
  }
  handleSearch(e) {
    this.setState({
      term: e.target.value,
    });
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Digite uma música, album ou artista"
          onChange={this.handleSearch}
        />
        <button className="SearchButton" onClick={this.search}>
          Jam !
        </button>
      </div>
    );
  }
}
