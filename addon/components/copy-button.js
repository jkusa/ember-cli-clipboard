import Component from '@ember/component';
import { set } from '@ember/object';
import Ember from 'ember';
import layout from '../templates/components/copy-button';

const CLIPBOARD_EVENTS = ['success', 'error'];

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
   * @property {String} buttonType - type attribute for button element
   */
  buttonType: 'button',

  /**
   * @property {Boolean} disabled - disabled state for button element
   */
  disabled: false,

  /**
   * If true - scope event listener to this element
   * If false - scope event listener to document.body (clipboardjs)
   * @property {Boolean} delegateClickEvent
   */
  delegateClickEvent: true,

  didInsertElement() {
    let clipboard;
    if (!this.delegateClickEvent) {
      clipboard = new window.ClipboardJS(this.element);
    } else {
      clipboard = new window.ClipboardJS(`#${this.get('elementId')}`);
    }
    set(this, 'clipboard', clipboard);

    CLIPBOARD_EVENTS.forEach(event => {
      clipboard.on(event,  () => {
        try {
          if (!this.disabled) {
            const action = this[event] || (() => null);
            action(...arguments);
          }
        }
        catch(error) {
          Ember.Logger.debug(error.message);
        }
      });
    });
  },

  willDestroyElement() {
    this.clipboard.destroy();
  }
});
