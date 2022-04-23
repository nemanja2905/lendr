import { get } from 'lodash';
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';

import adminActions from '../actions/adminActions';
import transactionActions from '../actions/transactionActions';

import LoadingButton from '../components/LoadingButton';

class Admin extends Component {
  state = {
    loading: false
  };

  testButton = () => {
    this.setState({
      loading: !this.state.loading
    })
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {user, dispatch} = this.props;

    if (user !== prevProps.user && user.token) {
      dispatch(adminActions.init(user.token));
    }
  };

  lockTransaction = (id) => {
    const {user, dispatch} = this.props;
    dispatch(transactionActions.lock(id, user.token));
  };

  unlockTransaction = (id) => {
    const {user, dispatch} = this.props;
    dispatch(transactionActions.free(id, user.token));
  };

  renderUsers = () => {
    const {admin} = this.props;

    const rows = get(admin, 'users', []).map((current, index) => {
      return (
        <tr key={`${index}-user-row`}>
          <td>{String(current.id)}</td>
          <td>{String(current.user_name)}</td>
          <td>{String(current.email)}</td>
          <td>{String(current.verified)}</td>
          <td>{String(current.connected_to_dwolla)}</td>
          <td>{String(current.user_rating)}</td>
          <td>{String(current.nick)}</td>
          <td>{String(current.password)}</td>
          <td>{String(current.created_at)}</td>
          <td>{String(current.friends)}</td>
          <td>{String(current.dwolla_id)}</td>
        </tr>
      );
    });
    return (
      <table className="table table-hover table-sm table-responsive">
        <thead>
          <tr>
            <th>id</th>
            <th>user_name</th>
            <th>email</th>
            <th>verified</th>
            <th>connected_to_dwolla</th>
            <th>user_rating</th>
            <th>nick</th>
            <th>password</th>
            <th>created_at</th>
            <th>friends</th>
            <th>dwolla id</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  };

  renderTransactions = () => {
    const {admin} = this.props;

    const rows = get(admin, 'transactions', []).map((current, index) => {
      return (
        <tr key={`${index}-transaction-row`}>
          <td>{current.id}</td>
          <td>{current.amount}</td>
          <td>{current.interest}</td>
          <td>{current.promise_to_pay_date}</td>
          <td>{current.memo}</td>
          <td>{current.status}</td>
          <td>{current.created_at}</td>
          <td>{current.created_by_user_id}</td>
          <td>{current.accepted_by_user_id}</td>
          <td>{current.seen_by_recipient}</td>
          <td>{current.seen_by_sender}</td>
          <td>{current.locked_on_timestamp}</td>
          <td>{current.settled_on}</td>
          <td>
            <button onClick={() => {this.lockTransaction(current.id)}} className="danger">Lock</button>
            <button onClick={() => {this.unlockTransaction(current.id)}} className="warning">Unlock</button>
          </td>
        </tr>
      );
    });
    return (
      <table className="table table-hover table-sm table-responsive">
        <thead>
          <tr>
            <th>id</th>
            <th>amount</th>
            <th>interest</th>
            <th>promise_to_pay_date</th>
            <th>memo</th>
            <th>status</th>
            <th>created_at</th>
            <th>created_by_user_id</th>
            <th>accepted_by_user_id</th>
            <th>seen_by_recipient</th>
            <th>seen_by_sender</th>
            <th>locked_on_timestamp</th>
            <th>settled_on</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  };

  render() {
    return (
      <div className="row">

        <LoadingButton
          className="btn btn-block btn-primary"
          onClick={this.testButton}
          loading={this.state.loading}
        >
          Test
        </LoadingButton>

        <div className="col">
          <p className="lead">Transactions</p>
          {this.renderTransactions()}
          <p className="lead">Users</p>
          {this.renderUsers()}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    transactionFeed: state.transactionReducer.transactionFeed,
    admin: state.adminReducer.admin
  }
};

export default connect(mapStateToProps)(Admin);
