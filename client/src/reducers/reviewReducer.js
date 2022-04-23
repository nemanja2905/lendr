export default function reviewReducer(state = {}, action) {
  switch (action.type) {
    case 'FETCH_REVIEWS_FOR_USER_SUCCESS':
      return {
        ...state,
        reviews: action.data
      }
    default:
      return state;
  }
};
