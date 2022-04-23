import { get } from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';
import transactionActions from '../actions/transactionActions';
import TransactionItem from '../components/TransactionItem';
import NoData from '../components/NoData';

class Feed extends Component {
  componentDidMount = () => {
    const {dispatch, transactionFeed} = this.props;

    const token = get(window.sessionStorage, 'token', false);
    if (token && !transactionFeed.length) {
      dispatch(transactionActions.fetchAll(token));
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch, transactionFeed} = this.props;

    if (get(prevProps, 'user.id', false) !== get(user, 'id', false) && user.token && transactionFeed !== prevProps.transactionFeed) {
      dispatch(transactionActions.fetchAll(user.token));
    }
  };

  renderTransactionFeed = () => {
    const {transactionFeed, user} = this.props;

    return transactionFeed && transactionFeed.length && user ?
      transactionFeed.map((current, index) => {
        const isLocked = current.status === 'locked';
        // was the card made by me?
        return (
          <TransactionItem
            showRepaymentButton={true}
            showDetailsButton={true}
            showRatingsButton={true}
            isLocked={isLocked}
            data={current}
            alwaysRenderOpen={true}
            createdByCurrentUser={current.created_by_user_id === user.id}
            borrowLendString={'borrowed'}
          />
        )
      }) : <NoData />
  };
  render() {
    return (
      <div className="row">
        <div className="col">
          {this.renderTransactionFeed()}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    transactionFeed: state.transactionReducer.transactionFeed
  }
};

export default connect(mapStateToProps)(Feed);
