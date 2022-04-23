export default function transactionReduced(state = {}, action) {
  switch (action.type) {
    case 'MODAL':
      return {
        ...state,
        modal: {
          ...action.data
        }
      }
    case 'NEW_STATUS':
      return {
        ...state,
        error: {
          message: action.message,
          className: action.className
        }
      }
    case 'NEW_ERROR':
      return {
        ...state,
        error: {
          message: JSON.stringify(action.error.message),
          className: 'alert-danger'
        }
      }
    case 'CLEAR_ALL_ERRORS':
      return {
        ...state,
        error: false
      }
    default:
      return state;
  }
};
