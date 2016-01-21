import React, {Component} from 'react';
import Todo from './Todo.jsx';

import todoActions from '../actions/todo';

export default class Todos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todos = this.props.todos.filter(::this.renderTodo);

    return (
      <section className="main">
        {this.renderToggleAll()}
        <ul className="todo-list">
          {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </section>
    )
  }

  renderTodo(todo) {
    if(this.props.filter === null) return true;

    return this.props.filter === todo.completed;
  }

  renderToggleAll() {
    if(this.props.todos.size > 0) {
      let allCompleted = (this.props.todos.filter(todo => todo.completed).size === this.props.todos.size);

      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={allCompleted}
          onChange={this.toggleAll.bind(this, allCompleted)} />
      );
    }
  }

  toggleAll(allCompleted) {
    todoActions.toggleAll(allCompleted);
  }
}
