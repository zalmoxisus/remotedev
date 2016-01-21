import React                                from 'react/addons';
import { ListGroupItem, Glyphicon, Button } from 'react-bootstrap';

import TodoListActions                      from 'actions/TodoList';

class TodoListTask extends React.Component {
  constructor(props) {
    super(props);
    this.removeTask = this.removeTask.bind(this);
  }

  removeTask() {
    TodoListActions.removeTask(this.props.task.get('id')); 
  }

  render() {
    let { task } = this.props;
    return (<ListGroupItem>
              {task.get('content')}
              <Button bsSize="xsmall" bsStyle="danger" className="pull-right" onClick={this.removeTask}>
                <Glyphicon glyph="remove" />
              </Button>
            </ListGroupItem>);
  }
}

export default TodoListTask;

