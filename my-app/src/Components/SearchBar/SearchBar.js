import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = { term: "" };
  }
  search(term) {
    this.props.onSearch(term);
  }
  handleSearch(e) {
    const term = e.target.value;
    this.search(term);
    this.setState({
      term: term,
    });
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleSearch}
        />
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}
