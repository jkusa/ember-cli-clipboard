import { findAll, find, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { triggerCopyError, triggerCopySuccess } from 'ember-cli-clipboard/test-support';

module('Acceptance | test helpers', function(hooks) {
  setupApplicationTest(hooks);

  test('test-helpers', async function(assert) {
    assert.expect(4);

    await visit('/');
    assert.notOk(!!findAll('.alert').length,
      'no alert message is initially present');

    assert.ok(find('.if-supported .container-body').textContent.match(/Clipboard is( not)? supported/),
      'whether clipboard is supported is shown');

    triggerCopySuccess();

    assert.ok(!!findAll('.alert.alert-success').length,
      'a success message is displayed when a copy is successful');

    triggerCopyError();

    assert.ok(!!findAll('.alert.alert-info').length,
      'an error message is displayed when a copy is unsuccessful');
  });
});
