import Component from '@ember/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/copy-button';

const CLIPBOARD_EVENTS = ['success', 'error'];

export default class CopyButtonComponent extends Component {
  layout = layout;
  tagName = "";

  /**
   * If true - scope event listener to this element
   * If false - scope event listener to document.body (ClipboardJS)
   * @property {Boolean} delegateClickEvent
   */
  delegateClickEvent = true;

  /**
   * Assigns button element an id
   * @returns {Void}
   */
  @action
  setupElement(element) {
    element.id = guidFor(this);
    this._buttonElement = element;
  }

  /**
   * Registers ClipboardJS object with component
   * @private
   * @returns {Void}
   */
  @action
  registerClipboard() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }

    const clipboard = this._createClipboard();
    this._registerActions(clipboard);
    this.clipboard = clipboard;
  }

  /**
   * Destroys `ClipboardJS` instance
   * @returns {Void}
   */
  @action
  destroyClipboard() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  /**
   * Creates new `ClipboardJS` instance
   * @private
   * @returns {Object} newly created ClipboardJS object
   */
  _createClipboard() {
    const { clipboardText: text, delegateClickEvent } = this;
    const trigger = delegateClickEvent === false
      ? this._buttonElement
      : `#${this._buttonElement.id}`;

    
    return new window.ClipboardJS(trigger, {
      text: typeof text === 'function' ? text : undefined
    });
  }

  /**
   * Registers Ember Actions with ClipboardJS events
   * @private
   * @param {Object} clipboard - ClipboardJS object
   * @returns {Void}
   */
  _registerActions(clipboard) {
    CLIPBOARD_EVENTS.forEach(event => {
      clipboard.on(event, () => {
        if (!this._buttonElement.disabled) {
          const action = this[event];
          if (typeof action === 'string') {
            // eslint-disable-next-line ember/closure-actions
            this.sendAction(action, ...arguments);
          } else {
            action && action(...arguments);
          }
        }
      });
    });
  }
}
