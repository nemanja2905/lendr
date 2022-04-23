export default function adminReduced(state = {}, action) {
  switch (action.type) {
    case 'FETCH_ADMIN_INFO_SUCCESS':
      return {
        ...state,
        admin: action.data
      }
    default:
      return state;
  }
};
