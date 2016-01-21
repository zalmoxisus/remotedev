import { createStore } from 'redux';
import rootReducer from '../reducers';
import logRemotely from './logRemotely';

export default function configureStore(initialState) {
  const store = logRemotely(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
