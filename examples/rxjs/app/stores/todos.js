import Rx from 'rx';
import update from 'react-addons-update';
import Immutable from 'immutable';

import todoActions from '../actions/todo';
import todoRecord from '../utils/todoRecord';
import persist from '../utils/persist';


let persistedData = persist.get();

function toImmutable(data) {
  return Immutable.fromJS(data, (key, value) => {
    // in case it was a record with an ID
    if(value.get('id')) return todoRecord()(value);

    return Immutable.Iterable.isIndexed(value) ? value.toList() : value.toOrderedMap();
  });
}
let initialSatate = {
  filter: null,
  todos: (persistedData) ? persistedData : []
};

function dispatch(action) {
  subject.onNext(action.state);
}

let store = toImmutable(initialSatate);
let subject = new Rx.BehaviorSubject(store);

subject.map(store => store.get('todos'))
  .distinctUntilChanged()
  .subscribe(persist.set);

todoActions.subjects.add.subscribe((text) => {
  store = store.updateIn(['todos'], (todos) => {
    return todos.push(todoRecord()({
      text
    }));
  });

  dispatch({ type: 'add', state: store });
});

todoActions.subjects.delete.subscribe((id) => {
  store = store.updateIn(['todos'], (todos) => {
    return todos.filter(todo => todo.id !== id);
  });

  dispatch({ type: 'delete', state: store });
});

todoActions.subjects.update.subscribe((data) => {
  store = store.updateIn(['todos'], (todos) => {
    return todos.map(todo => {
      if(todo.id === data.id) return todo.set('text', data.text);

      return todo;
    });
  });

  dispatch({ type: 'update', state: store });
});

todoActions.subjects.toggleEdit.subscribe((id) => {
  store = store.updateIn(['todos'], (todos) => {
    return todos.map(todo => {
      if(todo.id === id) return todo.set('edit', !todo.edit);

      return todo;
    });
  });

  dispatch({ type: 'toggleEdit', state: store });
});

todoActions.subjects.toggleCompleted.subscribe((data) => {
  store = store.updateIn(['todos'], (todos) => {
    return todos.map(todo => {
      if(todo.id === data.id) return todo.set('completed', data.completed);

      return todo;
    })
  });

  dispatch({ type: 'toggleCompleted', state: store });
});

todoActions.subjects.toggleAll.subscribe((allCompleted) => {
  store = store.updateIn(['todos'], (todos) => {
    return todos.map(todo => {
      return todo.set('completed', !allCompleted);
    });
  });

  dispatch({ type: 'toggleAll', state: store });
});

todoActions.subjects.clearCompleted.subscribe(() => {
  store = store.updateIn(['todos'], (todos) => {
    return todos.filter(todo => !todo.completed);
  });

  dispatch({ type: 'clearCompleted', state: store });
});

todoActions.subjects.filter.subscribe((filter) => {
  store = store.updateIn(['filter'], () => {
    return filter;
  });

  dispatch({ type: 'filter', state: store });
});

export default { subject };
