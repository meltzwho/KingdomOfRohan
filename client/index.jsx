import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GlobalSearch from './components/GlobalSearch.jsx';
import Profile_Search from './components/Profile_Search.jsx';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: 'test'
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  

  handleSignUp(username, password) {
    console.log('signing up with: ', username, password);
    axios.post('/signup', { username: username, password: password })
      .then((response) => {
        console.log('signed up successfully!');
        this.setState({
          loggedIn: true,
          user: username
        });
      })
      .catch((err) => {
        console.error('something went wrong on signup: ', err);
      });
  }

  handleLogin(username, password) {
    console.log('logging in with: ', username, password);
    axios.post('/login', { username: username, password: password })
      .then((response) => {
        if (response.data) {
          this.setState({
            loggedIn: true,
            user: username
          });
          console.log('Current logged in User: ', this.state.user)
        } else {
          console.log('Login retrieval is ', response.data)
        }
      })
      .catch((err) => {
        console.log('something went wrong: ', err)
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav loggedIn={this.state.loggedIn} />
          <Switch>
            <Route path="/global" render={() => <GlobalSearch user={this.state.user} />} />
            <Route path="/profile" render={() => (
              this.state.loggedIn ? (
                <Profile_Search user={this.state.user} />
              ) : (
                <Redirect to="/login" />
              )
            )} />
            <Route path="/login" render={() => (
              this.state.loggedIn ? (
                <Redirect to="/profile" />
              ) : (
                <Login signup={this.handleSignUp} login={this.handleLogin} />
              )
            )} />
            <Route path="/signup" render={() => <Signup signup={this.handleSignUp} login={this.handleLogin} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));