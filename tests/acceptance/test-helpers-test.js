import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  triggerCopyError,
  triggerCopySuccess
} from 'ember-cli-clipboard/test-support';

module('Acceptance | test helpers', function(hooks) {
  setupApplicationTest(hooks);

  test('test-helpers', async function(assert) {
    assert.expect(4);

    await visit('/');
    assert.dom('.alert').doesNotExist('no alert message is initially present');

    assert
      .dom('.application__supported-text')
      .hasText(
        /Clipboard is( not)? supported/,
        'whether clipboard is supported is shown'
      );

    triggerCopySuccess('.application__copy-button');

    assert
      .dom('.alert.alert-success')
      .exists('a success message is displayed when a copy is successful');

    triggerCopyError('.application__copy-button');

    assert
      .dom('.alert.alert-info')
      .exists('an error message is displayed when a copy is unsuccessful');
  });
});
