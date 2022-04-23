import {API} from '../API';

const loadingActions = {
  loading: (loading) => {
    return {
      type: 'LOADING',
      loading: loading
    }
  }
};

export default loadingActions;
