import React, {Component} from 'react';

export default class Modal extends Component {
  static defaultProps = {
    active: false,
    data: {
      closeFunc: () => null,
      bodyContent: '',
      headerContent: '',
      closeComponent: '',
      actionComponent: ''
    }
  };

  render() {
    const {
      closeFunc,
      bodyContent,
      headerContent,
      closeComponent,
      actionComponent
    } = this.props.data;
    const {active} = this.props;

    const showHideClasses = [
      'side-modal',
      active ? 'show' : 'hide'
    ].join(' ');

    return (
      <div>
        <div className={showHideClasses} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-header">
            {headerContent}
            <button onClick={closeFunc} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {bodyContent}

          <div className="modal-footer">
            {closeComponent}
            {actionComponent}
          </div>
        </div>
        {active ? <div onClick={closeFunc} className="modal-backdrop"></div> : null}
      </div>
    );
  }
};
