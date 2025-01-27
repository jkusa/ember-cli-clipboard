import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

import clipboard from '../modifiers/clipboard.ts';

import type { ClipboardModifierSignature } from '../modifiers/clipboard.ts';

export interface CopyButtonSignature {
  Args: ClipboardModifierSignature['Args'];

  Blocks: {
    default: [];
  };

  Element: HTMLButtonElement;
}

export default class CopyButton extends Component<CopyButtonSignature> {
  guid = guidFor(this);

  <template>
    <button
      class="copy-btn"
      type="button"
      data-clipboard-id={{this.guid}}
      ...attributes
      {{clipboard
        text=@text
        target=@target
        action=@action
        delegateClickEvent=@delegateClickEvent
        container=@container
        onError=@onError
        onSuccess=@onSuccess
      }}
    >
      {{yield}}
    </button>
  </template>
}
