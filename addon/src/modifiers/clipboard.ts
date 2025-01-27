import ClipboardJS from 'clipboard';
import { modifier } from 'ember-modifier';
import { isBlank } from '@ember/utils';
import { guidFor } from '@ember/object/internals';

const CLIPBOARD_EVENTS = ['success', 'error'];

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export interface ClipboardModifierSignature {
  Args: {
    Named: {
      action?: 'copy' | 'cut';
      container?: string;
      delegateClickEvent?: boolean;
      target?: string;
      text?: string;
      onSuccess?: (...args: unknown[]) => void;
      onError?: (...args: unknown[]) => void;
    };
    Positional: unknown[];
  };
  Element: HTMLElement | HTMLButtonElement;
}

export default modifier<ClipboardModifierSignature>((element, params, hash) => {
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

  if (!isBlank(text) && text) {
    element.setAttribute('data-clipboard-text', text);
  }
  if (!isBlank(target) && target) {
    element.setAttribute('data-clipboard-target', target);
  }

  if (isBlank(element.dataset['clipboardId'])) {
    element.setAttribute('data-clipboard-id', guidFor(element));
  }

  const trigger =
    delegateClickEvent === false
      ? element
      : `[data-clipboard-id=${element.dataset['clipboardId']}]`;

  const clipboard = new ClipboardJS(trigger, {
    text: typeof text === 'function' ? text : undefined,
    // @ts-expect-error
    container:
      typeof container === 'string'
        ? document.querySelector(container)
        : container,
    // @ts-expect-error
    target,
  });

  CLIPBOARD_EVENTS.forEach((event) => {
    clipboard.on(event, () => {
      if (!(element instanceof HTMLButtonElement) || !element.disabled) {
        // @ts-expect-error
        const action = hash[`on${capitalize(event)}`] as
          | ((...args: unknown[]) => void)
          | undefined;
        if (action) {
          action();
        }
      }
    });
  });

  return () => clipboard.destroy();
});
