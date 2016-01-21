import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import todoActions from '../actions/todo';
import keys from '../utils/keys';
import classNames from 'classnames';

export default class Todos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={classNames({'completed': this.props.todo.completed, 'editing': this.props.todo.edit})}>
        {(this.props.todo.edit) ? this.renderEdit() : this.renderText()}
      </li>
    )
  }

  renderText() {
    return (
      <div className="view">
        <input
          onChange={::this.toggleCompleted}
          ref="checkbox"
          type="checkbox"
          checked={(this.props.todo.completed) ? 'checked' : ''}
          className="toggle" />

        <label onDoubleClick={::this.toggleEdit}>{this.props.todo.text}</label>
        <button
          className="destroy"
          onClick={::this.delete}></button>
      </div>
    )
  }

  toggleCompleted() {
    todoActions.toggleCompleted(this.props.todo.id, this.refs.checkbox.checked);
  }

  renderEdit() {
    return (
      <input
        onKeyUp={::this.update}
        onBlur={::this.toggleEdit}
        ref="input"
        defaultValue={this.props.todo.text}
        className="edit"
        autoFocus />
    )
  }

  toggleEdit() {
    todoActions.toggleEdit(this.props.todo.id);
  }

  delete() {
    todoActions.delete(this.props.todo.id);
  }

  update(event) {
    if(event.which === keys.ESC) return this.toggleEdit();

    let domNode = ReactDOM.findDOMNode(this.refs.input);
    if(event.which !== 13 || !domNode.value) return;


    this.toggleEdit();

    todoActions.update(this.props.todo.id, domNode.value);
    domNode.value = '';
  }
}
