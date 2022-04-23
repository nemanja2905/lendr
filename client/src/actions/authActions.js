import {API} from '../API';
import React from 'react';
import {dispatchWithTimeout} from '../utils';

const authActions = {
  logout: () => {
    return {type: 'LOGOUT'}
  },
  authenticate: (token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.authenticate(token)
        .then((data) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'LOGIN_SUCCESS',
            data: data
          })
          if (!data.connected_to_dwolla && !data.dwolla_id) {
            dispatch({
              type: 'NEW_STATUS',
              message: <p className="mb-0"><span className="oi oi-warning"></span> You have not connected a funding source. Please visit your <a href="/profile">profile</a> to set one up</p>,
              className: 'alert-warning'
            })
          }
        })
        .catch((error) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'LOGIN_FAILURE',
            error: error
          })
        })
    }
  },
  setToken: (token) => {
    return {
      type: 'SET_USER_TOKEN_FROM_SESSION',
      token: token
    }
  },
  returnAuthStatus: () => {
    return (dispatch) => {
      dispatch({
        type: 'AUTH_STATUS',
        status: false
      })
    }
  },
  loginUser: (email, pass) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.loginUser(email, pass)
        .then((data) => {
          window.sessionStorage.token = data.token;
          dispatch({
            type: 'LOGIN_SUCCESS',
            data: data
          })

          dispatchWithTimeout(
            dispatch,
            5000,
            {message: 'Logged in successfully', className: 'alert-success'},
            'NEW_STATUS',
            'CLEAR_ALL_ERRORS'
          )

          if (!data.connected_to_dwolla && !data.dwolla_id) {
            dispatch({
              type: 'NEW_STATUS',
              message: <p className="mb-0"><span className="oi oi-warning"></span> You have not connected a funding source. Please visit your <a href="/profile">profile</a> to set one up</p>,
              className: 'alert-warning'
            })
          }

          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          console.log(error)
          dispatch({
            type: 'LOGIN_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  signupUser: (email, pass) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.signupUser(email, pass)
        .then((data) => {
          API.loginUser(email, pass)
            .then((loginData) => {
              dispatch({type: 'LOADING', loading: false});
              window.sessionStorage.token = loginData.token;
              dispatch({
                type: 'LOGIN_SUCCESS',
                data: loginData
              })
            })
            .catch((error) => {
              dispatch({
                type: 'LOGIN_FAILURE',
                error: error
              })
              dispatch({type: 'LOADING', loading: false});
            })
        })
        .catch((error) => {
          dispatch({
            type: 'SIGNUP_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  }
};

export default authActions;
