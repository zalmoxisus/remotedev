import Rx from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';

import todosStore from './stores/todos';

import App from './components/App.jsx';

todosStore.subject.subscribe((store) => {
  ReactDOM.render(<App store={store} />, document.getElementById('app'));
});
