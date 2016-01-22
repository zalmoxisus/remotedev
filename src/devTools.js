import { stringify, parse } from 'jsan';
import socketCluster from 'socketcluster-client';
import { socketOptions } from './constants';

let instanceName;
let socket;
let channel;
let nextActionId = 1;
let listeners = [];

function handleMessages(message) {
  if (message.type === 'DISPATCH' && message.state) {
    const parsedState = parse(message.state);
    listeners.forEach(listener => listener(parsedState));
  }
}

function connect(options) {
  if (socket) return;
  socket = socketCluster.connect(options);

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
  }
  connect(options && options.port ? options : socketOptions);
}

function transformAction(action) {
  if (typeof action === 'object') {
    if (!action.timestamp) action.timestamp = Date.now();
    if (!action.type) action.type = action.id || action.actionType || '';
    return action;
  }
  if (typeof action === 'string') return { type: action, timestamp: Date.now() };
  return '';
}

export function send(action, state, options) {
  start(options);
  setTimeout(() => {
    const message = {
      payload: state ? stringify(state) : '',
      action: transformAction(action),
      type: action !== undefined ? 'ACTION' : 'INIT',
      nextActionId: nextActionId || '',
      id: socket.id,
      name: instanceName
    };
    nextActionId++;
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
  nextActionId = 1;
  start(options);
  send(undefined, state, options);
}

export default { init, send, subscribe };
