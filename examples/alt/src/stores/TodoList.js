import ImmutableStore from 'alt/utils/ImmutableUtil';
import { List, fromJS }       from 'immutable';
import RemoteDev      from 'remotedev';

import AltInstance    from 'lib/AltInstance';
import Actions        from 'actions/TodoList';

class TodoListStore {
  constructor() {
    let { addTask, removeTask } = Actions;

    this.bindListeners({
      add: addTask,
      remove: removeTask
    });

    // Initial state is {}
    RemoteDev.init([]);
    // Subscribe to RemoteDev
    RemoteDev.subscribe(state => {
      this.setState(fromJS(state));
    });
    // Send changes to the remote monitor
    this.on('afterEach', payload => {
      RemoteDev.send(payload.details.id, this.state);
    });

    this.state = List();
  }

  add(task) {
    return this.setState(this.state.push(task));
  }

  remove(taskID) {
    let taskIndex = this.state.findIndex((task) => task.get('id') === taskID);

    return taskIndex !== (-1) ? this.setState(this.state.delete(taskIndex)) : 
                                this.state;
  }
}

export default AltInstance.createStore(ImmutableStore(TodoListStore));
