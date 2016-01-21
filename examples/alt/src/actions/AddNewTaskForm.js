import AltInstance from 'lib/AltInstance';

class AddNewTaskFormActions {
  changeContent(content) {
    this.dispatch(content);
  }

  clearForm() {
    this.dispatch();
  }
}

/* If your actions are as simple as just dispatching passed values, you can use a slightly different (and more concise) API for such use case:
 * export default alt.generateActions('changeContent', 'clearForm');
 */

export default AltInstance.createActions(AddNewTaskFormActions);
