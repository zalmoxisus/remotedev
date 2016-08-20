import { connectViaExtension } from 'remotedev';

function logReducer(reducer) {
  const remotedev = connectViaExtension();
  return (state, action) => {
    const reducedState = reducer(state, action);
    remotedev.send(action, reducedState);
    return reducedState;
  };
}

export default function logRemotely(next) {
  return function (reducer, initialState) {
    return next(logReducer(reducer), initialState);
  };
}
