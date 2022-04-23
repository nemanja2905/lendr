import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import LoginForm from './LoginForm';

export default class Sidebar extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="sidebar">
        <nav class="nav flex-column">
          <NavLink exact to={'/'} activeClassName="active" className="nav-link">
            <FontAwesomeIcon icon="home" color="white" size="lg" />
          </NavLink>
          {user ?
            <NavLink to={`/profile/${user.id}`} activeClassName="active" className="nav-link">
              <FontAwesomeIcon icon="user-circle" color="white" size="lg" />
            </NavLink>
            : null
          }
          {user ?    
            <NavLink to={'/admin'} activeClassName="active" className="nav-link">
              <FontAwesomeIcon icon="cog" color="white" size="lg" />
            </NavLink>
            : null
          }
          <NavLink to={'/transaction'} activeClassName="active" className="nav-link">
            <FontAwesomeIcon icon="plus-circle" color="white" size="lg" />
          </NavLink>
        </nav>
      </div>
    )
  }
}
