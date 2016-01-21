import React, {Component} from 'react';

import todoActions from '../actions/todo';

export default class clearCompleted extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.length === 0) return null;

    return (
      <button
        className="clear-completed"
        onClick={todoActions.clearCompleted}>Clear completed</button>
    )
  }
}
