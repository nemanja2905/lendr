import {API} from '../API';

const adminActions = {
  init: (token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.fetchAdminInfo(token)
        .then((data) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'FETCH_ADMIN_INFO_SUCCESS',
            data: data
          })
        })
        .catch((error) => {
          dispatch({type: 'LOADING', loading: false});
          dispatch({
            type: 'FETCH_ADMIN_INFO_FAILURE',
            error: error
          })
        })
    }
  }
};

export default adminActions;
