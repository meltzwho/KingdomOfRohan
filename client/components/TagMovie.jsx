import React from 'react';
import MovieCard from './MovieCard.jsx';
const axios = require('axios');

class TagMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbMoods: ['whimsical', 'intense', 'thriller', 'heartfelt', 'gripping', 'boring', 'thoughtProvoking', 'uplifting', 'light', 'tearJerker', 'challenging', 'mindScrew', 'nostalgic', 'powerful', 'despair', 'exhausting', 'paranoid', 'motivated', 'uncomfortable'],
      moods: [],
      selected: 'whimsical',
      //movie and user should eventually come from props after testing
      movie: this.props.movie,
      user: this.props.user 
    };

    this.handleChangeMood = this.handleChangeMood.bind(this);
    this.addMood = this.addMood.bind(this);
    this.handleSaveMovie = this.handleSaveMovie.bind(this);
    this.handleDeleteMood = this.handleDeleteMood.bind(this);
  }

  handleChangeMood(e) {
    this.setState({ selected: e.target.value });
    console.log(this.state.selected);
  }

  addMood() {
    let temp = this.state.moods;
    if (!temp.includes(this.state.selected)) {
      temp.push(this.state.selected);
    }
    this.setState({ moods: temp });
  }

  // parseMovieHelper(movie) {
  //   //eventually move this function somewher else imo
  //   let { id, original_title, poster_path, overview, release_date } = movie;
  //   release_date = release_date.slice(0, 4);
  //   let moods = this.state.moods;
  //   let current_user = this.props.user;
  //   return {
  //     id,
  //     original_title,
  //     poster_path,
  //     overview,
  //     release_date,
  //     moods,
  //     current_user
  //   };
  // }

  handleSaveMovie() {
    let movie = this.state.movie
    movie = Object.assign(
      movie,
      {
        moods: this.state.moods,
        current_user: this.state.user
      }
    );
    
    console.log('Saving movie ', movie);

    axios
      .post('/save', movie)
      .then((response) => {
        console.log('Server accepted movie submission', response);
      })
      .catch((err) => console.log('FrontEnd err sending movie to server', err));
  }

  handleDeleteMood(e) {
    let index = e.target.value;
    let temp = this.state.moods;
    temp.splice(index, 1);
    this.setState({ moods: temp });
  }

  render() {
    return (
      <div className="section">
        <div className="columns">
          <div className="column is-two-fifths">
            <MovieCard movie={this.props.movie}/>
            <div className="container">
              {this.state.moods.map((mood, index) => (
                <span className="tag is-warning" style={{ margin: '7px' }}>
                  {mood}
                  <button
                    onClick={this.handleDeleteMood}
                    value={index}
                    className="delete"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="title is-title-4">Add Moods:</div>
          <select
            onChange={this.handleChangeMood}
            className="select is-multiple"
          >
            {this.state.dbMoods.map((option, index) => {
              return (
                <option value={option} key={index}>
                  {option}
                </option>
              );
            })}
          </select>
          <button onClick={this.addMood}>Add Mood</button>
          <button onClick={this.handleSaveMovie}>Submit</button>
        </div>
      </div>
    );
  }
}

export default TagMovie;


