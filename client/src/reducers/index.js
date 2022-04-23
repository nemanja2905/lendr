import { combineReducers } from 'redux';

import authReducer from '../reducers/authReducer';
import transactionReducer from '../reducers/transactionReducer';
import errorReducer from '../reducers/errorReducer';
import loadingReducer from '../reducers/loadingReducer';
import userReducer from '../reducers/userReducer';
import adminReducer from '../reducers/adminReducer';
import reviewReducer from '../reducers/reviewReducer';

export default combineReducers({
  authReducer,
  transactionReducer,
  errorReducer,
  loadingReducer,
  userReducer,
  adminReducer,
  reviewReducer
});
