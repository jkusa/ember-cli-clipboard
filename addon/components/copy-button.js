import Component from '@ember/component';
import { set, action } from '@ember/object';
import ClipboardJS from 'clipboard';

import layout from '../templates/components/copy-button';

const CLIPBOARD_EVENTS = ['success', 'error'];

export default class extends Component {
  layout = layout;
  tagName = '';

  /**
   * @property {Boolean} disabled - disabled state for button element
   */
  disabled = false;

  /**
   * If true - scope event listener to this element
   * If false - scope event listener to document.body (ClipboardJS)
   * @property {Boolean} delegateClickEvent
   */
  delegateClickEvent = true;

  /**
   * Creates new `ClipboardJS` instance
   * @method _createClipboard
   * @private
   * @returns {Object} newly created ClipboardJS object
   */
  _createClipboard() {
    const { clipboardText: text } = this;
    const trigger = this.delegateClickEvent
      ? `#${this.buttonElementId}`
      : this.buttonElement;

    return new ClipboardJS(trigger, {
      text: typeof text === 'function' ? text : undefined
    });
  }

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
  }

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
  }

  @action
  setupElement(element) {
    // TODO: do we really need to default to setting the element id?
    element.id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5);

    this.buttonElement = element;
    this.buttonElementId = element.id;
  }

  @action
  registerClipboard() {
    this._registerClipboard();
  }

  @action
  destroyClipboard() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
}
