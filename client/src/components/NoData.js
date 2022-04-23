import React, {Component} from 'react';

export default class NoData extends Component {
  static defaultProps = {
    message: false
  };

  render() {
    const {message} = this.props;

    return (
      <div className="no-data-wrapper">
      {message ? message : <p className="lead text-muted">Nothing here</p>}
      </div>
    );
  }
};
