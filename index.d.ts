declare module 'ember-cli-clipboard/components/copy-button' {
  import Component from '@glimmer/component';

  export default class CopyButton extends Component<{
    Args: {
      text: string;
      target?: string;
      action?: 'copy' | 'cut';
      container?: string | Element;
      delegateClickEvent?: boolean;
      buttonType?: string;
      onSuccess?: () => void;
      onError?: () => void;
    };
    Blocks: {
      default: [];
    };
    Element: HTMLButtonElement;
  }> {}
}
