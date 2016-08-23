import { stringify, parse } from 'jsan';
import socketCluster from 'socketcluster-client';
import { defaultSocketOptions } from './constants';

let socket;
let channel;
let listeners = [];

export function extractState(message) {
  if (message.type === 'DISPATCH' && message.state) {
    return parse(message.state);
  }
}

export function generateId(instanceId) {
  return instanceId || Math.random().toString(36).substr(2);
}

function handleMessages(message) {
  if (!message.payload) message.payload = message.action;
  listeners.forEach(listener => listener(message));
}

function watch() {
  if (channel) return;
  socket.emit('login', 'master', (err, channelName) => {
    if (err) { console.warn(err); return; }
    channel = socket.subscribe(channelName);
    channel.watch(handleMessages);
    socket.on(channelName, handleMessages);
  });
}

function connectToServer(options) {
  if (socket) return;
  let socketOptions;
  if (options.port) {
    socketOptions = {
      port: options.port,
      hostname: options.hostname || 'localhost',
      secure: !!options.secure
    };
  } else socketOptions = defaultSocketOptions;
  socket = socketCluster.connect(socketOptions);
  watch();
}

export function start(options) {
  if (options) {
    if (options.port && !options.hostname) {
      options.hostname = 'localhost';
    }
  }
  connectToServer(options);
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

export function send(action, state, options, type) {
  start(options);
  setTimeout(() => {
    const message = {
      payload: state ? stringify(state) : '',
      action: type === 'ACTION' ? transformAction(action) : action,
      type: type || 'ACTION',
      id: socket.id,
      name: options.name
    };
    if (options.instanceId) message.instanceId = options.instanceId;
    socket.emit(socket.id ? 'log' : 'log-noid', message);
  }, 0);
}

export function subscribe(listener, options) {
  start(options);
  listeners.push(listener);

  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}

export function init(state = {}, options) {
  start(options);
  send(undefined, state, options, 'INIT');
}

export function connect(options = {}) {
  options.instanceId = generateId(options.instanceId);
  start(options);
  return {
    init: (state, action) => {
      send(action || {}, state, options, 'INIT');
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
        send(undefined, payload, options, 'STATE');
      }
    },
    error: (payload) => {
      socket.emit({ type: 'ERROR', payload, id: socket.id });
    }
  };
}

export function connectViaExtension(options) {
  if (options && options.remote || typeof window === 'undefined' || !window.devToolsExtension) {
    return connect(options);
  }
  return window.devToolsExtension.connect(options);
}

export default { init, send, subscribe, connect, connectViaExtension };
