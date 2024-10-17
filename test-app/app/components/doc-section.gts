import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { guidFor } from '@ember/object/internals';
import FlashMessage from 'ember-cli-flash/components/flash-message';

import type FlashMessageService from 'ember-cli-flash/services/flash-messages';

export interface DocSectionSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [(msgObj: { message: string }) => void];
  };
  Element: HTMLElement;
}

export default class DocSection extends Component<DocSectionSignature> {
  @service declare readonly flashMessages: FlashMessageService;

  guid = guidFor(this);

  get messageQueue() {
    const { flashMessages, guid } = this;
    // @ts-expect-error: something in funky with upstream types
    return flashMessages.arrangedQueue.filter((m) => m.guid === guid);
  }

  showMessage = (msgObj: { message: string }) => {
    this.flashMessages.add({ ...msgObj, ctx: this.guid });
  };

  <template>
    <section class="doc-section">
      <div class="doc-section__header">
        {{#each this.messageQueue as |message|}}
          <FlashMessage @flash={{message}} as |component flash|>
            <p>
              {{! @glint-ignore }}
              {{flash.message}}
            </p>
          </FlashMessage>
        {{/each}}
        <p class="doc-section__header-title">{{@title}}</p>
      </div>
      <div class="doc-section__body">
        {{yield this.showMessage}}
      </div>
    </section>
  </template>
}
