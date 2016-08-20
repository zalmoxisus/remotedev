import { stringify, parse } from 'jsan';
import socketCluster from 'socketcluster-client';
import { socketOptions } from './constants';

let instanceName;
let socket;
let channel;
let listeners = [];

function handleMessages(message) {
  if (message.type === 'DISPATCH' && message.state) {
    const parsedState = parse(message.state);
    listeners.forEach(listener => listener(parsedState));
  }
}

function connectToServer(options) {
  if (socket) return;
  socket = socketCluster.connect(options);
}

function watch() {
  if (channel) return;
  socket.emit('login', 'master', (err, channelName) => {
    if (err) { console.error(err); return; }
    channel = socket.subscribe(channelName);
    channel.watch(handleMessages);
    socket.on(channelName, handleMessages);
  });
}

export function start(options) {
  if (options) {
    instanceName = options.name;

    if (options.port && !options.hostname) {
      options.hostname = 'localhost';
    }
  }
  connectToServer(options && options.port ? options : socketOptions);
}

function transformAction(action) {
  if (action.action) return action;
  const liftedAction = { timestamp: Date.now() };
  if (typeof action === 'object') {
    liftedAction.action = action;
    if (!action.type) liftedAction.action.type = action.id || action.actionType || 'update';
  } else if (typeof action === 'undefined') {
    liftedAction.action = 'update';
  } else {
    liftedAction.action = { type: action };
  }
  return liftedAction;
}

export function send(action, state, options) {
  start(options);
  setTimeout(() => {
    const message = {
      payload: state ? stringify(state) : '',
      action: transformAction(action),
      type: action !== undefined ? 'ACTION' : 'INIT',
      id: socket.id,
      name: instanceName
    };
    socket.emit(socket.id ? 'log' : 'log-noid', message);
  }, 0);
}

export function subscribe(listener, options) {
  start(options);
  watch();
  listeners.push(listener);

  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

export function init(state = {}, options) {
  start(options);
  send(undefined, state, options);
}

export function connect(options = {}) {
  start(options);
  return {
    init: (state, action) => {
      socket.emit({
        type: 'INIT',
        payload: state,
        action: action || {}
      });
    },
    subscribe: (listener) => {
      if (!listener) return undefined;
      listeners.push(listener);

      return function unsubscribe() {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    },
    unsubscribe: (instanceId) => {
      delete listeners[instanceId];
    },
    send: (action, payload) => {
      if (action) {
        send(action, payload, options);
      } else {
        socket.emit({ type: 'STATE', payload, id: socket.id });
      }
    },
    error: (payload) => {
      socket.emit({ type: 'ERROR', payload, id: socket.id });
    }
  };
}

export function connectViaExtension(options) {
  if (typeof window === 'undefined' || !window.devToolsExtension) return connect(options);
  return window.devToolsExtension.connect(options);
}

export default { init, send, subscribe, connect, connectViaExtension };
