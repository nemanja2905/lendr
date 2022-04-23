import React, { Component } from 'react';
import ioClient from 'socket.io-client';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { get } from 'lodash';

import particleParams from '../particleParams';
import authActions from '../actions/authActions';

import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

let io = ioClient();

class Wrapper extends Component {
  componentDidMount = () => {
    const { user, location, dispatch } = this.props;
    const token = get(window.sessionStorage, 'token', false);

    if (!user || !token) {
      if (location.pathname !== '/login') {
        const token = get(window.sessionStorage, 'token', false);
        if (!token || token === 'false') {
          window.location.pathname = '/login';
        } else {
          dispatch(authActions.authenticate(token));
        }
      }
    }

    io.on('SOCKET__TRANSACTION_UPDATE', (socket) => {
      dispatch({
        type: 'SOCKET__TRANSACTION_UPDATE',
        transactionId: socket.transactionId,
        status: socket.status
      })
    })

    io.on('SOCKET__TEST', (socket) => {
      dispatch({
        type: 'NEW_STATUS',
        message: socket.data,
        className: 'alert-warning'
      })
    })
  };

  render() {
    const { loading, error, user, modal } = this.props;
    const shouldDisplayNav = !!user;
    const isLoginPage = window.location.pathname === '/login';

    return (
      <div className={`container-fluid ${isLoginPage ? 'h-100' : ''}`}>
        {isLoginPage ?
          <Particles
            className="particle-wrapper"
            params={particleParams}
            width={'100%'}
            height={'100%'} />
          : null
        }
        <div className="row h-100">
          <Navbar
            shouldDisplayNav={shouldDisplayNav}
            isLoginPage={isLoginPage}
            user={user}
          />
          {!isLoginPage ? <Sidebar user={user}/> : null}
          <div className="container justify-content-center">
            <div className="content-wrapper">
              {this.props.children}
            </div>
          </div>
          <Modal active={modal && modal.active} data={modal} />
          {loading ? <div className="loading-bar"></div> : null}
          {/* {error ? <Alert error={error} /> : null} */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    error: state.errorReducer.error,
    loading: state.loadingReducer.loading,
    modal: state.errorReducer.modal
  }
};

const ConnectedWrapper = connect(mapStateToProps)(Wrapper);
export default ConnectedWrapper;