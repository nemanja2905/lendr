// Redux
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const configureStore = () => {
  const customMiddleWare = store => next => action => {
    console.log("Middleware triggered:", action);
    next(action);
  }
  const logger = createLogger({ collapsed: true });
  const middlewares = [ thunk ];
  const devMiddlewares = [ logger, customMiddleWare ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(...devMiddlewares);
  }

  return createStore(
    reducers,
    applyMiddleware(...middlewares),
  );
}

export const store = configureStore();
