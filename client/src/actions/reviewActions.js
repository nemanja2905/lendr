import {API} from '../API';

const reviewActions = {
  fetchReviewsForUser: (id, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});

      API.fetchReviewsForUser(id, token)
        .then((data) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'FETCH_REVIEWS_FOR_USER_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'FETCH_REVIEWS_FOR_USER_FAILURE',
            error: error
          })
        })
    }
  },
  postReview: (data, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});

      API.addNewReview(data, token)
        .then((data) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'POST_REVIEW_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'POST_REVIEW_FAILURE',
            error: error
          })
        })
    }
  }
};

export default reviewActions;
