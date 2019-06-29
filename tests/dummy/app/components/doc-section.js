import Component from '@ember/component';
import layout from '../templates/components/doc-section';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['doc-section'],
  tagName: 'section',
  flashMessages: service(),
  messageQueue: computed('flashMessages.arrangedQueue', function() {
    return this.flashMessages
      .get('arrangedQueue')
      .filter(m => m.ctx === this.elementId);
  }),

  actions: {
    showMessage(msgObj) {
      this.flashMessages.add(
        Object.assign({}, msgObj, { ctx: this.elementId })
      );
    }
  }
});
