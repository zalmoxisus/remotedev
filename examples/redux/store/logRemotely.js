import { send } from 'remotedev';

function logReducer(reducer) {
  return (state, action) => {
    const reducedState = reducer(state, action);
    send(action, reducedState);
    return reducedState;
  };
}

export default function logRemotely(next) {
  return function (reducer, initialState) {
    return next(logReducer(reducer), initialState);
  };
}
