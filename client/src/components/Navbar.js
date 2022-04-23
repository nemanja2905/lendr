import React, { Component } from 'react'
import NotificationManager from '../components/NotificationManager';
import { NavLink } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class Navbar extends Component {
  render() {
    const { shouldDisplayNav, user, isLoginPage } = this.props;

    return (
      <div className={`navbar-wrapper ${!isLoginPage ? 'w-100' : ''}`}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <NavLink to={'/'} className="navbar-brand">
            <FontAwesomeIcon icon="dot-circle" color="white" size="2x" />
          </NavLink>
        </nav>
      </div>
    )
  }
}
