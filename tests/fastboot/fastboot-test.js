import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | fastboot', function (hooks) {
  setup(hooks);

  test('it renders with FastBoot', async function (assert) {
    await visit('/');
    assert
      .dom('button.copy-btn')
      .exists({ count: 5 }, '`<CopyButton>` renders in FastBoot');
    assert
      .dom('.application__supported-text')
      .hasText(
        'Clipboard is not supported',
        '`{{is-clipboard-supported}}` returns `false` in FastBoot'
      );
  });
});
