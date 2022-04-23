import { findIndex } from 'lodash';

const initialState = {
  transactionFeed: []
};

export default function transactionReduced(state = initialState, action) {
  switch (action.type) {
    case 'SOCKET_NEW_TRANSACTION_SUCCESS':
      return {
        ...state,
        transactionFeed: state.transactionFeed.unshift(action.data)
      }
    case 'FETCH_TRANSACTIONS_FOR_USER_SUCCESS':
      return {
        ...state,
        borrowHistory: action.borrowHistory,
        lendHistory: action.lendHistory
      }
    case 'LOCK_TRANSACTION_SUCCESS':
      return {
        ...state,
        transaction: {
          ...state.transaction,
          status: 'locked'
        }
      }
    case 'FREE_TRANSACTION_SUCCESS':
      return {
        ...state,
        transaction: {
          ...state.transaction,
          status: 'pending'
        }
      }
    case 'FETCH_TRANSACTION_SUCCESS':
      return {
        ...state,
        transaction: action.data
      }
    case 'FETCH_ALL_TRANSACTIONS':
      return {
        ...state,
        transactionFeed: action.data
      }
    case 'SOCKET__TRANSACTION_UPDATE': {
      const found = findIndex(state.transactionFeed, {id: Number(action.transactionId)})
      const newFeed = [...state.transactionFeed];

      if (newFeed[found]) {
        newFeed[found].status = action.status;
      }

      return {
        ...state,
        transactionFeed: newFeed
      }
    }
    default:
      return state;
  }
};
