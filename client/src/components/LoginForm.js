import { capitalize } from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import authActions from '../actions/authActions';
import errorActions from '../actions/errorActions';
import {NavLink} from 'react-router-dom'
class LoginForm extends Component {
  static defaultProps = {
    isLoginPage: false
  };

  state = {
    method: 'login',
    email: '',
    password: '',
    tos: false,
    isOpen: false
  };

  componentDidMount = () => {
    window.addEventListener('click', this.handleOutsideClick);
  };

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleOutsideClick);
  };

  handleOutsideClick = (e) => {
    const {isOpen} = this.state;

    const clickTarget = e.target;
    const login_popup = this.login_popup;

    if (login_popup && !login_popup.contains(clickTarget) && isOpen) {
      this.handleClose();
    }
  };

  handleOpen = () => {
    this.setState({
      isOpen: true
    })
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    })
  };

  toggleOpen = () => {

    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen
      }
    })
  };

  handleSubmit = (e) => {
    const {dispatch} = this.props;
    const {email, password, method, tos} = this.state;

    e.preventDefault();
    if (method === 'login') {
      if (!email.length || !password.length) {
        dispatch(errorActions.throw('Email or Password fields are not filled in.'))
        return false;
      } else {
        dispatch(errorActions.clear())
        dispatch(authActions.loginUser(email, password));
      }
    } else if (method === 'signup') {
      if (!email.length || !password.length || !tos) {
        dispatch(errorActions.throw('Email, Password or TOS acceptance fields are not filled in.'))
        return false;
      } else {
        dispatch(errorActions.clear())
        dispatch(authActions.signupUser(email, password));
      }
    }
  };

  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value
    })
  };

  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value
    })
  };

  handleTOSInput = (e) => {
    this.setState({
      tos: !!e.target.value
    })
  };

  setMethod = (method) => {
    this.setState({
      method: method
    })
  };

  render() {
    const {email, password, method, isOpen} = this.state;
    const {isLoginPage} = this.props;

    const content = !isLoginPage ?
      <div className="login-nav card">
        <NavLink activeClassName="btn-primary" exact className="nav-item nav-link" to="/about">help</NavLink>
        <hr />
        <NavLink activeClassName="btn-primary" exact className="nav-item nav-link" to="/login">logout</NavLink>
      </div> :
      <div className="login-nav card">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={this.handleEmailInput}
              value={email}
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              />
            {method === 'signup' ? <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> : null}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={this.handlePasswordInput}
              value={password}
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          {
            method === 'signup' ?
            <div className="form-check">
              <label className="form-check-label">
                <input onChange={this.handleTOSInput} type="checkbox" className="form-check-input"/>
                I agree to the <a href="/terms">terms of service</a>
              </label>
            </div> : null
          }
          <button type="submit" className="btn btn-primary btn-block">{capitalize(method)}</button>
        </form>
        <hr />
        <div className="login-toggle">
          <span
            className={`button-inverse ${method === 'login' ? 'active' : null}`}
            onClick={() => {this.setMethod('login')}}
          >
            Login
          </span>
          <span
            className={`button-inverse ${method === 'signup' ? 'active' : null}`}
            onClick={() => {this.setMethod('signup')}}
          >
            Signup
          </span>
        </div>
        <hr />
        <NavLink activeClassName="btn-primary" exact className="nav-item nav-link" to="/about">help</NavLink>
      </div>

    return (
      <div className="row">
        {content}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(LoginForm);
