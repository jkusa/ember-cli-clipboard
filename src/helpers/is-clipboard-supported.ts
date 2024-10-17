import Helper from '@ember/component/helper';
import { getOwner } from '@ember/owner';
import { isSupported } from 'clipboard';

import type Owner from '@ember/owner';

/**
 *
 * # Check If Clipboard Is Supported
 *
 * ```gjs
 * import { isClipboardSupported } from '@aklkv/ember-cli-clipboard';
 *
 * <template>
 *   {{#if (isClipboardSupported)}}
 *     Clipboard is supported 🎉
 *   {{else}}
 *     Clipboard is not supported 😔
 *   {{/if}}
 * </template>
 *```
 */
export default class isClipboardSupported extends Helper<{
  Args: {
    Positional: [
      /**
       * The action to check support for.
       */
      action?: string,
    ];
  };
  Return: boolean;
}> {
  isFastBoot: boolean;

  constructor(owner: Owner) {
    super(owner);
    const service = getOwner(this)?.lookup('service:fastboot');
    // @ts-expect-error: this is fine
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.isFastBoot = service ? service.isFastBoot : false;
  }

  compute([action]: [action?: string]) {
    const { isFastBoot } = this;

    // @ts-expect-error: bug in clipboard.js types
    return isFastBoot ? false : isSupported(action);
  }
}
