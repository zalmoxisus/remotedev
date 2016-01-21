import React, {Component} from 'react';

import Header from './Header.jsx';
import Todos from './Todos.jsx';
import Footer from './Footer.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const store = {
      todos: this.props.store.get('todos'),
      filter: this.props.store.get('filter')
    };

    return (
      <div>
        <Header />
        <Todos {...store} />
        <Footer {...store} />
      </div>
    );
  }
}
