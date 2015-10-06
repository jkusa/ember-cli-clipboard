import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    success() {
      this.set('message', 'Success! Text copied to clipboard.');
    },
    error() {
      this.set('message', 'Type ⌘-c to copy');
    }
  }
});
