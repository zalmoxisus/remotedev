'use strict';

describe('ReactImmutableAltTodoApp', function () {
  var React = require('react/addons');
  var ReactImmutableAltTodoApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactImmutableAltTodoApp = require('components/ReactImmutableAltTodoApp.js');
    component = React.createElement(ReactImmutableAltTodoApp);
  });

  it('should create a new instance of ReactImmutableAltTodoApp', function () {
    expect(component).toBeDefined();
  });
});
