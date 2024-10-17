import ClipboardJS from 'clipboard';
import { modifier } from 'ember-modifier';
import { isBlank } from '@ember/utils';
import { guidFor } from '@ember/object/internals';

const CLIPBOARD_EVENTS = ['success', 'error'];

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * ```gjs live preview no-shadow
 * import { clipboard } from '@aklkv/ember-cli-clipboard';
 *
 * const onSuccess = () => {
 *   alert('Text copied to clipboard successfully!');
 * };
 *
 * <template>
 *   <button
 *     class='application__copy-button'
 *     type='button'
 *     {{clipboard text='element modifier' onSuccess=onSuccess}}
 *   >
 *     Copy Text
 *   </button>
 * </template>
 * ```
 */
export interface ClipboardModifierSignature {
  Args: {
    Named: {
      /**
       * The action to perform, either 'copy' or 'cut'.
       * Defaults to 'copy'.
       */
      action?: 'copy' | 'cut';
      /**
       * The container element for the clipboard action.
       * Can be a string selector or an HTMLElement.
       */
      container?: string | ClipboardJS.Options['container'];
      /**
       * If true, the click event is scoped to this element.
       * If false, it is scoped to document.body (ClipboardJS default).
       * Defaults to true.
       */
      delegateClickEvent?: boolean;
      /**
       * The target element to copy from.
       * Can be a string selector or a function that returns an element.
       * If not provided, the text attribute will be used.
       */
      target?: string | ((trigger: Element) => Element);
      /**
       * The text to copy to the clipboard.
       * If provided, it overrides the target attribute.
       * Can be a string or a function that returns a string.
       */
      text?: string | ((trigger: Element) => string);
      /**
       * Callback function to execute on successful copy.
       * Receives the ClipboardJS event as an argument.
       */
      onSuccess?: (event: ClipboardJS.Event) => void;
      /**
       * Callback function to execute on copy error.
       * Receives the ClipboardJS event as an argument.
       */
      onError?: (event: ClipboardJS.Event) => void;
    };
  };
  Element: HTMLElement | HTMLButtonElement;
}

const clipboardModifier = modifier<ClipboardModifierSignature>(
  (element, params, hash) => {
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

    if (typeof text === 'string' && !isBlank(text)) {
      element.setAttribute('data-clipboard-text', text);
    }
    if (typeof target === 'string' && !isBlank(target)) {
      element.setAttribute('data-clipboard-target', target);
    }

    if (isBlank(element.dataset['clipboardId'])) {
      element.setAttribute('data-clipboard-id', guidFor(element));
    }

    const trigger =
      delegateClickEvent === false
        ? element
        : `[data-clipboard-id="${element.dataset['clipboardId']}"]`;

    const clipboard = new ClipboardJS(trigger, {
      text: typeof text === 'function' ? text : undefined,
      // @ts-expect-error: ClipboardJS types are not accurate
      container:
        typeof container === 'string'
          ? document.querySelector(container)
          : container,
      // @ts-expect-error: ClipboardJS types are not accurate
      target,
    });

    CLIPBOARD_EVENTS.forEach((event) => {
      clipboard.on(event, (clipboardEvent) => {
        if (!(element instanceof HTMLButtonElement) || !element.disabled) {
          // @ts-expect-error: ClipboardJS types are not accurate
          const action = hash[`on${capitalize(event)}`] as
            | ((...args: unknown[]) => void)
            | undefined;
          if (action) {
            action(clipboardEvent);
          }
        }
      });
    });

    return () => clipboard.destroy();
  },
);

export default clipboardModifier;
