import React                    from 'react/addons';
import { Grid, Row, ListGroup } from 'react-bootstrap';
import TodoListStore            from 'stores/TodoList';
import TodoListTask             from 'components/TodoListTask';
import AddNewTaskForm           from 'components/AddNewTaskForm';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state                    = { tasks: TodoListStore.getState() };
    this.listChanged              = this.listChanged.bind(this);
  }

  componentDidMount()    { TodoListStore.listen(this.listChanged); }
  componentWillUnmount() { TodoListStore.unlisten(this.listChanged); }

  listChanged(taskList)  { this.setState({ tasks: taskList }); }

  render() {
    let {tasks} = this.state;

    return (
      <Grid>
        <Row fluid={true}>
          <h1>Tasks:</h1>
          <ListGroup>
            {tasks.map(task =>
              <TodoListTask key={task.get('id')} task={task} />
             ).toJS()}
          </ListGroup>
          <h2>Add new task:</h2>
          <AddNewTaskForm />
        </Row>
      </Grid>
    );
  }
}

export default TodoList;
