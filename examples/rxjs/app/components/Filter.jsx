import React, {Component} from 'react';
import classNames from 'classnames';

import todoActions from '../actions/todo';

export default class Filter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <a className={classNames({'selected': (this.props.filter === null)})} onClick={this.filter.bind(this, null)} href="#">All</a>
        </li>
        <li>
          <a className={classNames({'selected': (this.props.filter === false)})} onClick={this.filter.bind(this, false)} href="#">Active</a>
        </li>
        <li>
          <a className={classNames({'selected': (this.props.filter === true)})} onClick={this.filter.bind(this, true)} href="#">Completed</a>
        </li>
      </ul>
    );
  }

  filter(toFilter) {
    todoActions.filter(toFilter);
  }
}
