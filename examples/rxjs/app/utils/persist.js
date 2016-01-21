import Immutable from 'immutable';

let persist = {
  set(data) {
    window.localStorage.todos = JSON.stringify(data.toJS());
  },

  get() {
    let todos = window.localStorage.todos;
    return (todos) ? JSON.parse(todos) : null;
  }
};

export default persist;
