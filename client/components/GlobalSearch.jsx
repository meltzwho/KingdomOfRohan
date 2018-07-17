import React from 'react';
import axios from 'axios';

class GlobalSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dbMoods: ['happy', 'sad', 'uplifting'],
      moods: [],
      selected: 'happy'
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMood = this.addMood.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    //update genre list from db
  }

  handleChange(e) {
    this.setState({ selected: e.target.value });
    console.log(this.state.selected);
  }

  addMood() {
    let temp = this.state.moods;
    if (temp.length < 3 && !temp.includes(this.state.selected)) {
      temp.push(this.state.selected);
    }
    this.setState({ moods: temp });
  }

  handleSearch() {
    console.log('Querying server for ', this.state.moods);
    
    //create the search params by transfroming into string with spaces
    var params = {moods: this.state.moods.join(' ')};
   
    //send moods array to server and eventually query DB
    axios.get('/results/', {params})
      .then((response) => {
        //do something
      })
      .catch((err) => console.error(err));
  }

  handleDelete(e) {
    let index = e.target.value;
    let temp = this.state.moods;
    temp.splice(index, 1);
    this.setState({ moods: temp });
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="title is-title-3">Search for These Moods:</div>
          <div>{this.state.moods.map((mood, index) => <div onClick={this.handleDelete} value={index}>{mood}</div>)}</div>
          <select onChange={this.handleChange}>
            {this.state.dbMoods.map((option, index) => {
              return <option value={option} key={index}>{option}</option>;
            })}
          </select>
          <button onClick={this.addMood}>Add Mood</button>
          <button onClick={this.handleSearch}>Find Me Movies</button>
        </div>
      </div>
    );
  }
}

export default GlobalSearch;