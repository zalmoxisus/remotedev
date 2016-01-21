import Rx from 'rx';

const subjects = {
  add: new Rx.Subject(),
  delete: new Rx.Subject(),
  update: new Rx.Subject(),
  toggleEdit: new Rx.Subject(),
  toggleCompleted: new Rx.Subject(),
  toggleAll: new Rx.Subject(),
  clearCompleted: new Rx.Subject(),
  filter: new Rx.Subject()
};

export default {
  subjects,

  add(item) {
    subjects.add.onNext(item);
  },

  delete(id) {
    subjects.delete.onNext(id);
  },

  update(id, text) {
    subjects.update.onNext({ id, text });
  },

  toggleEdit(id) {
    subjects.toggleEdit.onNext(id);
  },

  toggleCompleted(id, completed) {
    subjects.toggleCompleted.onNext({ id, completed });
  },

  toggleAll(allCompleted) {
    subjects.toggleAll.onNext(allCompleted);
  },

  clearCompleted() {
    subjects.clearCompleted.onNext();
  },

  filter(filter) {
    subjects.filter.onNext(filter);
  }
};
