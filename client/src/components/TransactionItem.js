import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ReviewDisplay from './ReviewDisplay';

export default class TransactionItem extends Component {
  static defaultProps = {
    showRepaymentButton: true,
    showDetailsButton: true,
    showRatingsButton: true,
    showAcceptanceButton: false,
    alwaysRenderOpen: false,
  };
  state = {
    open: false
  };
  toggleOpen = () => {
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    const {
      isLocked,
      data,
      createdByCurrentUser,
      borrowLendString,
      openRepaymentModal,
      openRatingsModal,
      showRepaymentButton,
      showDetailsButton,
      showRatingsButton,
      showAcceptanceButton,
      openAcceptanceModal,
      alwaysRenderOpen
    } = this.props;

    const open = alwaysRenderOpen ? true : this.state.open;

    const classes = [
      'card',
      'feed-card',
      isLocked ? 'locked' : null,
      data.status === 'settled' ? 'settled' : null,
      open ? 'show' : 'hide'
    ].join(' ');

    const textClasses = [
      isLocked ? 'text-danger' : null,
      data.status === 'settled' ? 'text-success' : null,
      data.status === 'pending' || data.status === 'accepted' ? 'text-primary' : null
    ].join(' ');

    return (
      <div className={classes}>
        <div className="card-body">
          <div onClick={() => {this.toggleOpen()}} class="d-flex justify-content-between align-items-center card-open-header">
            <h4 className={`card-title mb-0 font-weight-light ${textClasses}`}>${data.amount} <small>for</small> ${data.interest}</h4>
            <div className="card-header-status-wrapper d-flex align-items-center">
              <p className="text-muted small m-0 toggle-info hide-hover"><pre className="m-0">{data.status}</pre></p>
              <p className="text-muted small m-0 toggle-info show-hover"><pre className="m-0">{open ? '▴ view less' : '▾ view more'}</pre></p>
            </div>
          </div>

          {open ? <p className="card-subtitle mb-2 mt-2 text-muted">payback: {new Date(data.promise_to_pay_date).toLocaleDateString()}</p> : null}
          {open ? <p className="card-text">{data.memo}</p> : null}

        </div>
        {
          open ?
            <div className="list-group">
                {!!data.review_id ? <ReviewDisplay data={data} /> : null}
                <Link className={`${textClasses} list-group-item list-group-item-action`} to={`/profile/${data.created_by_user_id}`}>
                  {createdByCurrentUser ? 'my profile' : 'view user'}
                </Link>

            {
              !isLocked && showDetailsButton ?
                  <Link className={`${textClasses} list-group-item list-group-item-action`} to={`/transaction/${data.id}`}>loan details</Link> : null
             }
             {
              showRatingsButton && !createdByCurrentUser && borrowLendString === 'loaned' && data.status === 'settled' ?
                  <a onClick={() => {openRatingsModal(data)}} className={`${textClasses} list-group-item list-group-item-action`} href="#">rate experience </a> : null
             }
             {
               showRepaymentButton && createdByCurrentUser && data.status !== 'locked' && data.status !== 'settled' && borrowLendString === 'borrowed' ?
                   <a onClick={() => {openRepaymentModal(data.id, (data.amount + data.interest))}} className={`${textClasses} list-group-item list-group-item-action`} href="#">repay </a> : null
             }
             {
               showAcceptanceButton && !createdByCurrentUser && data.status !== 'locked' && data.status !== 'settled' && borrowLendString === 'borrowed' ?
                   <a onClick={() => {openAcceptanceModal(data.id, (data.amount + data.interest))}} className={`${textClasses} list-group-item list-group-item-action`} href="#">accept </a> : null
             }
            </div> :
            null
        }
        </div>
    );
  }
};
