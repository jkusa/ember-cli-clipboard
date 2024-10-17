import { module, test } from 'qunit';
// @ts-expect-error: no types available
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module.skip('FastBoot | fastboot', function (hooks) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  setup(hooks);

  test('it renders with FastBoot', async function (assert) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await visit('/');

    assert
      .dom('button.copy-btn')
      .exists({ count: 5 }, '`<CopyButton>` renders in FastBoot');
    assert
      .dom('.application__supported-text')
      .hasText(
        'Clipboard is not supported',
        '`{{is-clipboard-supported}}` returns `false` in FastBoot',
      );
  });
});
