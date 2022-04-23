export default function loadingReducer(state = {}, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
};
