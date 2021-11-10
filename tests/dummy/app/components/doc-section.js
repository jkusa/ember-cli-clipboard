import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DocSection extends Component {
  @service
  flashMessages;

  guid = guidFor(this);

  get messageQueue() {
    const { flashMessages, guid } = this;
    return flashMessages.arrangedQueue.filter((m) => m.ctx === guid);
  }

  @action
  showMessage(msgObj) {
    this.flashMessages.add(Object.assign({}, msgObj, { ctx: this.guid }));
  }
}
