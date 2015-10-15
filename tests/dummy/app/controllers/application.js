import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    success(event) {
      this.set('copiedText', event.text);
    },
    error(e) {
      this.set('copiedText', 'Oops.. something went wrong');
    }
  }
});
