import Component from '@ember/component';
import { run } from '@ember/runloop';
import { set, get } from '@ember/object';
import Ember from 'ember';
import layout from '../templates/components/copy-button';

export default Component.extend({
  layout: layout,
  tagName: 'button',
  classNames: ['copy-btn'],
  attributeBindings: [
    'clipboardText:data-clipboard-text',
    'clipboardTarget:data-clipboard-target',
    'clipboardAction:data-clipboard-action',
    'buttonType:type',
    'disabled',
    'aria-label',
    'title'
  ],

  /**
   * @property {Array} clipboardEvents - events supported by clipboard.js
   */
  clipboardEvents: ['success', 'error'],

  /**
   * @property {String} buttonType - type attribute for button element
   */
  buttonType: 'button',

  /**
   * @property {Boolean} disabled - disabled state for button element
   */
  disabled: false,

  didInsertElement() {
    let clipboard = new window.Clipboard(`#${this.get('elementId')}`);
    set(this, 'clipboard', clipboard);

    get(this, 'clipboardEvents').forEach(action => {
      clipboard.on(action, run.bind(this, e => {
        try {
          if (!this.get('disabled')) {
            this.sendAction(action, e);
          }
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
