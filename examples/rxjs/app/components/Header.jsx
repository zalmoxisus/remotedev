import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import todoActions from '../actions/todo';

import keys from '../utils/keys';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  // check a proper way of doing this
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          ref="input"
          onKeyUp={::this.add} />
      </header>
    )
  }

  add(event) {
    let domNode = ReactDOM.findDOMNode(this.refs.input);

    if(event.which !== keys.ENTER || !domNode.value) return;

    todoActions.add(domNode.value);
    domNode.value = '';
  }
}
