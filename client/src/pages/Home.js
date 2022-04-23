import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Home extends Component {
  state = {
    authtoken: false,
    username: false,
    transactions: [],
    passwordInput: '',
    usernameInput: ''
  };

  componentDidMount = () => {
    // fetch('/api/v1/users')
    //   .then(res => res.json())
    //   .then(users => {
    //     console.log(users)
    //   });
  };

  handlePasswordInput = (e) => {
    this.setState({
      passwordInput: e.target.value
    })
  };

  handleUsernameInput = (e) => {
    this.setState({
      usernameInput: e.target.value
    })
  };

  authenticate = () => {
    const {passwordInput, usernameInput} = this.state;

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const opts = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        user_name: usernameInput,
        password: passwordInput
      })
    };

    fetch(`/api/v1/authenticate`, opts)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          authtoken: data.token,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">Active</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-3">Fluid jumbotron</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
              </div>
            </div>
            <div className="card" style={{width: '20rem'}}>
              <img className="card-img-top" src="http://placehold.it/200x200" alt="Card image cap" />
              <div className="card-body">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>

            <input onChange={this.handleUsernameInput} type="text" />
            <input onChange={this.handlePasswordInput} type="password" />
            <button onClick={this.authenticate}>Authenticate</button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status
  }
};

export default connect(mapStateToProps)(Home);
