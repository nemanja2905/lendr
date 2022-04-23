import { get } from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import transactionActions from '../actions/transactionActions';
import errorActions from '../actions/errorActions';
import reviewActions from '../actions/reviewActions';
import TransactionItem from '../components/TransactionItem';
import RatingsComponent from '../components/RatingsComponent';

class Transaction extends Component {
  state = {
    hasAcceptedTransaction: false,
    modal: false,
    allowedToLockUnlock: true
  };

  componentDidMount = () => {
    const {dispatch, transactionFeed, match} = this.props;

    const token = get(window.sessionStorage, 'token', false);

    if (token) {
      const id = get(match, 'params.id', false);
      if (token && !transactionFeed && id) {
        dispatch(transactionActions.fetchById(id, token));
      }
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {transaction} = this.props;

    if (prevProps.transaction !== this.props.transaction) {
      if (transaction.status !== 'pending') {
        this.setState({
          allowedToLockUnlock: false
        })
      }
    }
    if (prevState.hasAcceptedTransaction !== this.state.hasAcceptedTransaction) {
      this.closeModal()
    }
  };

  componentWillUnmount = () => {
    const {dispatch, transaction} = this.props;
    const {hasAcceptedTransaction, allowedToLockUnlock} = this.state;
    const token = get(window.sessionStorage, 'token', false);

    // this is very wrong
    if (!hasAcceptedTransaction && token && allowedToLockUnlock) {
      dispatch(transactionActions.free(transaction.id, token));
    }
  };

  acceptTransaction = () => {
    const {dispatch, transaction, user} = this.props;
    dispatch(transactionActions.accept(transaction.id, user.token, user.id));
    this.setState({
      hasAcceptedTransaction: true
    })
  };

  repayLoan = (transactionId) => {
    const {dispatch, user} = this.props;

    dispatch(transactionActions.repay(transactionId, user.token));
  };

  openAcceptanceModal = () => {
    const {dispatch, transaction, user} = this.props;

    this.setState({
      modal: true
    });

    if (user) {
      dispatch(errorActions.modal({
        type: 'MODAL',
        active: true,
        closeFunc: this.closeModal,
        actionFunc: this.acceptTransaction,
        bodyContent: (
          <div className="modal-body">
            <p>Are you sure you want to lend this money?</p>
            <a href="#">Make sure to read our guidelines and terms of service</a>
          </div>
        ),
        headerContent: (
          <h5 className="modal-title" id="exampleModalLabel">Send ${transaction.amount}?</h5>
        ),
        closeComponent: (
          <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        ),
        actionComponent: (
          <button onClick={this.acceptTransaction} type="button" className="btn btn-primary">Send money!</button>
        )
      }));
      dispatch(transactionActions.lock(transaction.id, user.token));
    }
  };

  openRepaymentModal = (transactionId) => {
    const {dispatch, transaction} = this.props;
    const transactionAmount = (transaction.amount + transaction.interest);
    dispatch(errorActions.modal({
      type: 'MODAL',
      // data: {
        active: true,
        closeFunc: this.closeModal,
        actionFunc: this.repayLoan,
        bodyContent: (
          <div className="modal-body">
            <p>Are you sure you want to repay this loan?</p>
            <p>{transactionAmount} will be withdrawn from your account</p>
          </div>
        ),
        headerContent: (
          <h5 className="modal-title" id="exampleModalLabel">Repay</h5>
        ),
        closeComponent: (
          <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        ),
        actionComponent: (
          <button onClick={() => {this.repayLoan(transactionId)}} type="button" className="btn btn-primary">Repay!</button>
        )
      // }
    }));
  };

  // openAcceptanceModal = (transactionId, transactionAmount) => {
  //   const {dispatch} = this.props;

  //   dispatch(errorActions.modal({
  //     type: 'MODAL',
  //     // data: {
  //       active: true,
  //       closeFunc: this.closeModal,
  //       actionFunc: this.acceptTransaction,
  //       bodyContent: (
  //         <div className="modal-body">
  //           <p>Are you sure you want to accept this loan?</p>
  //           <p>WARNING TEXT ABOUT DANGERS OF LOANING MONEY</p>
  //         </div>
  //       ),
  //       headerContent: (
  //         <h5 className="modal-title" id="exampleModalLabel">Repay</h5>
  //       ),
  //       closeComponent: (
  //         <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
  //       ),
  //       actionComponent: (
  //         <button onClick={() => {this.acceptTransaction()}} type="button" className="btn btn-primary">Accept!</button>
  //       )
  //     // }
  //   }));
  // };

  closeModal = () => {
    const {dispatch, transaction, user} = this.props;
    const {hasAcceptedTransaction} = this.state;

    // this.setState({
    //   modal: false
    // });
    dispatch(errorActions.modal({
      type: 'MODAL',
      active: false
    }))
    if (!hasAcceptedTransaction && user) {
      dispatch(transactionActions.free(transaction.id, user.token));
    }
  };
  openRepaymentModal = (transactionId, transactionAmount) => {
    const {dispatch} = this.props;

    dispatch(errorActions.modal({
      type: 'MODAL',
      active: true,
      closeFunc: this.closeModal,
      actionFunc: this.repayLoan,
      bodyContent: (
        <div className="modal-body">
          <p>Are you sure you want to repay this loan?</p>
          <p>{transactionAmount} will be withdrawn from your account</p>
        </div>
      ),
      headerContent: (
        <h5 className="modal-title" id="exampleModalLabel">Repay</h5>
      ),
      closeComponent: (
        <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      ),
      actionComponent: (
        <button onClick={() => {this.repayLoan(transactionId)}} type="button" className="btn btn-primary">Repay!</button>
      )
    }));
  };

  rateUser = (data) => {
    const {dispatch, user} = this.props;

    dispatch(reviewActions.postReview(data, user.token));
  };

  openRatingsModal = (data) => {
    const {dispatch, user} = this.props;

    dispatch(errorActions.modal({
      type: 'MODAL',
      active: true,
      closeFunc: this.closeModal,
      actionFunc: this.rateUser,
      headerContent: (
        <h5 className="modal-title" id="exampleModalLabel">Rate your experience</h5>
      ),
      bodyContent: (
        <div className="modal-body">
          <RatingsComponent onSubmit={this.rateUser} transactionData={data} userData={user} />
        </div>
      ),
    }))
  }
  renderModal = () => {
    const {transaction} = this.props;

    return (
      <div style={{display: 'block'}}className="modal show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Send ${transaction.amount}?</h5>
              <button onClick={this.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to lend this money?</p>
              <a href="#">Make sure to read our guidelines and terms of service</a>
            </div>
            <div className="modal-footer">
              <button onClick={this.closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={() => {this.acceptTransaction()}} type="button" className="btn btn-primary">Send money!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {transaction, user} = this.props;

    return transaction && user ?
      <TransactionItem
        longForm={true}
        showRepaymentButton={true}
        showDetailsButton={false}
        showAcceptanceButton={transaction.created_by_user_id !== user.id && transaction.status === 'pending'}
        showRatingsButton={transaction.accepted_by_user_id === user.id}
        isLocked={transaction.status === 'locked'}
        data={transaction}
        createdByCurrentUser={transaction.created_by_user_id === user.id}
        borrowLendString={'borrowed'}
        openRepaymentModal={this.openRepaymentModal}
        openAcceptanceModal={this.openAcceptanceModal}
        openRatingsModal={this.openRatingsModal}
        alwaysRenderOpen={true}
      /> : null
  }
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    transaction: state.transactionReducer.transaction
  }
};

export default connect(mapStateToProps)(Transaction);
