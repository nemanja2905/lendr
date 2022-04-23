// dispatch = the dispatch function to be passed from components
// timeout = the duration
// options = an options object spread into the dispatch
// triggerString = the string of the action type to show
// hideString = the string of the action type to hide
export const dispatchWithTimeout = (dispatch, timeout, options = {}, triggerString, hideString) => {
  dispatch({type: triggerString, ...options});

  setTimeout(() => {
    dispatch({type: hideString});
  }, timeout)
};
