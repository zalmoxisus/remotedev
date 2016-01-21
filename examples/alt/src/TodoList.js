'use strict';

require('bootstrap/less/bootstrap.less');

import React    from 'react/addons';
import TodoList from 'components/TodoList';

React.render(<TodoList />, document.getElementById('todo-list'));

