export default function authReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_USER_TOKEN_FROM_SESSION':
      return {
        ...state,
        user: {
          ...state.user,
          token: action.token
        }
      }
    case 'AUTH_STATUS':
      return {
        ...state,
        status: action.status
      }
    case 'LOGOUT':
      return {
        ...state,
        user: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: true,
        user: {...action.data}
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        status: false,
        user: false
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        status: true,
        user: false
      }
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        status: false,
        user: false
      }
    default:
      return state;
  }
};
