import Ember from 'ember';
import layout from '../templates/components/copy-button';
/* global Clipboard */

const { get, set } = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'button',
  classNames: ['copy-btn'],
  attributeBindings: ['clipboardText:data-clipboard-text'],

  /**
   * @property {Array} clipboardEvents - events supported by clipboard.js
   */
  clipboardEvents: ['success', 'error'],

  didInsertElement() {
    let clipboard = new Clipboard(`#${this.get('elementId')}`);
    set(this, 'clipboard', clipboard);

    get(this, 'clipboardEvents').forEach(action => {
      clipboard.on(action, Ember.run.bind(this, function(e) {
        try {
          this.sendAction(action, e);
        }
        catch(error) {
          Ember.Logger.debug(error.message);
        }
      }));
    });
  },

  willDestroyElement() {
    get(this, 'clipboard').destroy();
  }
});
