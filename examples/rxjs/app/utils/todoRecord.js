import Immutable from 'immutable';
import uuid from 'node-uuid'

export default () => new Immutable.Record({
  id: uuid(),
  edit: false,
  completed: false,
  text: ''
});
