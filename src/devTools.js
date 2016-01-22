import { stringify } from 'jsan';

export function send(action, state, options = {}) {
  setTimeout(() => {
    const message = {
      payload: state ? stringify(state) : '',
      action: action ? stringify(action) : '',
      type: action !== undefined ? 'ACTION' : 'INIT',
      id: options.id,
      name: options.name
    };
    console.log(message);
  }, 0);
}

export function init(state, options) {
  send(undefined, state, options);
}

export default { init, send };
