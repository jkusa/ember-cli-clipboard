import { modifier } from 'ember-modifier';
import ClipboardJS from 'clipboard';
import { isBlank } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { macroCondition, dependencySatisfies } from '@embroider/macros';

const CLIPBOARD_EVENTS = ['success', 'error'];

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function clipboard(element, params, hash) {
  const {
    action = 'copy',
    container,
    /*
     * delegateClickEvent true - scope event listener to this element
     * delegateClickEvent false - scope event listener to document.body (ClipboardJS)
     */
    delegateClickEvent = true,
    target,
    text,
  } = hash;

  element.setAttribute('data-clipboard-action', action);

  if (!isBlank(text)) {
    element.setAttribute('data-clipboard-text', text);
  }
  if (!isBlank(target)) {
    element.setAttribute('data-clipboard-target', target);
  }

  if (isBlank(element.dataset.clipboardId)) {
    element.setAttribute('data-clipboard-id', guidFor(element));
  }

  const trigger =
    delegateClickEvent === false
      ? element
      : `[data-clipboard-id=${element.dataset.clipboardId}]`;

  const clipboard = new ClipboardJS(trigger, {
    text: typeof text === 'function' ? text : undefined,
    container:
      typeof container === 'string'
        ? document.querySelector(container)
        : container,
    target,
  });

  CLIPBOARD_EVENTS.forEach((event) => {
    clipboard.on(event, () => {
      if (!element.disabled) {
        const action = hash[`on${capitalize(event)}`];
        action?.(...arguments);
      }
    });
  });

  return () => clipboard.destroy();
}

let clipboardModifier;

if (macroCondition(dependencySatisfies('ember-modifier', '4.x'))) {
  clipboardModifier = modifier(clipboard, { eager: false });
} else {
  clipboardModifier = modifier(clipboard);
}

export default clipboardModifier;
