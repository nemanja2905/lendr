const errorActions = {
  modal: (data) => {
    return {
      type: 'MODAL',
      data: data
    }
  },
  throw: (error) => {
    return {
      type: 'NEW_ERROR',
      error: error
    }
  },
  clear: () => {
    return {
      type: 'CLEAR_ALL_ERRORS'
    }
  }
};

export default errorActions;
