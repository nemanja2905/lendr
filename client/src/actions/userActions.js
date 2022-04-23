import {API} from '../API';

const userActions = {
  fetchDwollaUser: (url, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.fetchDwollaUser(url, token)
        .then((data) => {
          dispatch({
            type: 'FETCH_DWOLLA_USER_SUCCESS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'FETCH_DWOLLA_USER_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  createNewDwollaUser: (data, token, dwolla_id = false) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.createNewDwollaUser(data, token, dwolla_id)
        .then((data) => {
          dispatch({
            type: 'CREATE_DWOLLA_USER_SUCCESS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'CREATE_DWOLLA_USER_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  },
  fetchById: (id, token) => {
    return (dispatch) => {
      dispatch({type: 'LOADING', loading: true});
      API.fetchUserById(id, token)
        .then((data) => {
          dispatch({
            type: 'FETCH_PROFILE_SUCCESS',
            data: data
          })
          dispatch({type: 'LOADING', loading: false});
        })
        .catch((error) => {
          dispatch({
            type: 'FETCH_PROFILE_FAILURE',
            error: error
          })
          dispatch({type: 'LOADING', loading: false});
        })
    }
  }
};

export default userActions;
