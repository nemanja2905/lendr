import {API} from '../API';
import {dispatchWithTimeout} from '../utils';

const transactionActions = {
  repay: (id, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.repayLoan(id, token)
        .then((data) => {
          dispatch({
            type: 'LOAN_REPAYMENT_SUCCESS',
            data: data
          })
          dispatchWithTimeout(
            dispatch,
            5000,
            {message: 'Loan repaid. Good job!', className: 'alert-success'},
            'NEW_STATUS',
            'CLEAR_ALL_ERRORS'
          )
          dispatch({type: 'LOADING', loading: false});
          dispatch({type: 'MODAL', active: false});
        })
        .catch((error) => {
          dispatch({
            type: 'LOAN_REPAYMENT_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
          dispatch({type: 'NEW_ERROR', error: error});
        })
    }
  },
  lock: (id, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true})
      API.lockTransaction(id, token)
        .then((data) => {
          dispatch({
            type: 'LOCK_TRANSACTION_SUCCESS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'LOCK_TRANSACTION_FAILURE',
            error: error
          })
          dispatch({type: 'NEW_ERROR', error: error})
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  free: (id, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true})
      API.freeTransaction(id, token)
        .then((data) => {
          dispatch({
            type: 'FREE_TRANSACTION_SUCCESS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'FREE_TRANSACTION_FAILURE',
            error: error
          })
          dispatch({type: 'NEW_ERROR', error: error})
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  accept: (data, token, fromUser) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.acceptLoan(data, token, fromUser)
        .then((data) => {
          dispatch({
            type: 'LOAN_ACCEPTANCE_SUCCESS',
            data: data
          })
          dispatchWithTimeout(
            dispatch,
            5000,
            {message: 'Loan Accepted!', className: 'alert-success'},
            'NEW_STATUS',
            'CLEAR_ALL_ERRORS'
          )
          dispatch({type: 'LOADING', loading: false});
          dispatch({type: 'MODAL', active: false});
        })
        .catch((error) => {
          dispatch({
            type: 'LOAN_ACCEPTANCE_FAILURE',
            error: error
          })
          dispatch({type: 'NEW_ERROR', error: error})
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  new: (data, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.newTransaction(data, token)
        .then((data) => {
          dispatch({
            type: 'NEW_TRANSACTION_SUCCESS',
            data: data,
          })
          dispatch({type: 'LOADING', loading: false});

          dispatchWithTimeout(
            dispatch,
            5000,
            {message: 'Transaction created!', className: 'alert-success'},
            'NEW_STATUS',
            'CLEAR_ALL_ERRORS'
          )
        })
        .catch((error) => {
          dispatch({
            type: 'NEW_TRANSACTION_FAILURE',
            error: error
          })
          dispatch({type: 'NEW_ERROR', error: error})
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  fetchById: (id, token) => {
    return (dispatch) => {
      API.fetchTransactionById(id, token)
        .then((data) => {
          dispatch({
            type: 'FETCH_TRANSACTION_SUCCESS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: error
          })
          dispatch({type: 'NEW_ERROR', error: error})
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  fetchAllBorrowedForUser: (id, token) => {
    return (dispatch) => {
      API.fetchTransactionsByUserId(id, token)
        .then((data) => {
          dispatch({
            type: 'FETCH_TRANSACTIONS_FOR_USER_SUCCESS',
            borrowHistory: data.borrowData.data,
            lendHistory: data.lendData.data
          })
        })
        .catch((error) => {
          dispatch({
            type: 'FETCH_TRANSACTIONS_FOR_USER_FAILURE',
            error: error
          })
          dispatch({type: 'NEW_ERROR', error: error})
        })
    }
  },
  fetchAll: (token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.fetchAllTransactions(token)
        .then((data) => {
          dispatch({
            type: 'FETCH_ALL_TRANSACTIONS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'TRANSACTION_ERROR',
            error: error
          })
          dispatch({type: 'NEW_ERROR', error: error})
          dispatch({type: 'LOADING', loading: false});
        })
    }
  }
};

export default transactionActions;
