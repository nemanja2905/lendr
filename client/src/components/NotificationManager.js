import React, {Component} from 'react';

export default class NotificationManager extends Component {
  static defaultProps = {
    user: false
  };

  state = {
    open: false
  };

  openPopout = () => {
    this.setState({
      open: true
    })
  };

  closePopout = () => {
    this.setState({
      open: false
    })
  };

  render() {
    const {open} = this.state;
    return (
      <div className="nav-item nav-link notification-link" onMouseEnter={this.openPopout} onMouseLeave={this.closePopout}>
        <span>Notifications</span>
        <span class="indicator"><pre>14</pre></span>
        <div className="notification-popout">
          {
            open ?
              <ul className="list-group">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul> :
              null
          }
        </div>
      </div>
    );
  }
};
