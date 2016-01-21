import React, {Component} from 'react';

export default class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span className="todo-count"><strong>{this.props.length}</strong> item{(this.props.length !== 1) ? 's' : ''} left</span>
      </div>
    );
  }
}
