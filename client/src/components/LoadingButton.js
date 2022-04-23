import React, {Component} from 'react';

export default class LoadingButton extends Component {
  render() {
    return (
      <button className={`loading-button ${this.props.className}`} onClick={() =>{this.props.onClick()}}>
        {this.props.loading ?  <div className="loading-button-loader"></div> : this.props.children}
      </button>
    );
  }
};
