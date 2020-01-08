import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { filter } from '@ember/object/computed';


export default class DocSection extends Component {
  tagName = "";

  @service
  flashMessages;

  get guid() {
    return guidFor(this);
  }

  @filter('flashMessages.arrangedQueue', function(m) {
    return m.ctx === this.guid;
  })
  messageQueue;

  @action
  showMessage(msgObj) {
    this.flashMessages.add(
      Object.assign({}, msgObj, { ctx: this.guid })
    );
  }
}
