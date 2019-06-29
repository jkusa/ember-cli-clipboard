import Component from '@ember/component';
import { set } from '@ember/object';
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
   * If false - scope event listener to document.body (ClipboardJS)
   * @property {Boolean} delegateClickEvent
   */
  delegateClickEvent: true,

  /**
   * Creates new `ClipboardJS` instance
   * @method _createClipboard
   * @private
   * @returns {Object} newly created ClipboardJS object
   */
  _createClipboard() {
    const { clipboardText: text } = this;
    const trigger = this.delegateClickEvent
      ? `#${this.elementId}`
      : this.element;
    return new window.ClipboardJS(trigger, {
      text: typeof text === 'function' ? text : undefined
    });
  },

  /**
   * Registers Ember Actions with ClipboardJS events
   * @method _registerActions
   * @private
   * @param {Object} clipboard - ClipboardJS object
   * @returns {Void}
   */
  _registerActions(clipboard) {
    CLIPBOARD_EVENTS.forEach(event => {
      clipboard.on(event, () => {
        if (!this.disabled) {
          const action = this[event] || (() => {});
          if (typeof action === 'string') {
            // eslint-disable-next-line ember/closure-actions
            this.sendAction(action, ...arguments);
          } else {
            action(...arguments);
          }
        }
      });
    });
  },

  /**
   * Registers ClipboardJS object with component
   * @method _registerClipboard
   * @private
   * @returns {Void}
   */
  _registerClipboard() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }

    const clipboard = this._createClipboard();
    this._registerActions(clipboard);
    set(this, 'clipboard', clipboard);
  },

  didInsertElement() {
    this._super(...arguments);
    this._registerClipboard();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._registerClipboard();
  },

  willDestroyElement() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
});
