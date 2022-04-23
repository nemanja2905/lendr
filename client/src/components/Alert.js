import React, { Component } from 'react'

export default class Alert extends Component {
  static propTypes = {
    error: {
      className: '',
      message: '',
    },
  }

  render() {
    const { error } = this.props;

    return (
      <div className={`alert ${error.className}`} role="alert">
        {error.message}
      </div>
    )
  }
}
