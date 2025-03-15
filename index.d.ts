declare module 'ember-cli-clipboard/components/copy-button' {
  import Component from '@glimmer/component';
  import ClipboardJS from 'clipboard';

  export default class CopyButton extends Component<{
    Args: {
      text?: string | ClipboardJS.Options['text'];
      target?: string | ClipboardJS.Options['target'];
      action?: 'cut' | 'copy' | ClipboardJS.Options['action'];
      container?: string | ClipboardJS.Options['container'];
      delegateClickEvent?: boolean;
      buttonType?: HTMLButtonElement['type'];
      onSuccess?: (event: ClipboardJS.Event) => void;
      onError?: (event: ClipboardJS.Event) => void;
    };
    Blocks: {
      default: [];
    };
    Element: HTMLButtonElement;
  }> {}
}
