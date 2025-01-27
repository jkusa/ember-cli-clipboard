import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render, click, rerender } from '@ember/test-helpers';
import { CopyButton } from 'ember-cli-clipboard';
import { tracked } from 'tracked-built-ins';

const context = tracked<{
  enabled?: boolean;
  callback?: (() => void | null) | null;
  text?: unknown;
}>({
  enabled: false,
  callback: undefined,
  text: undefined,
});

module('Integration | Component | copy button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    context.enabled = false;
    context.callback = null;
  });

  test('component renders and cleans up', async function (assert) {
    context.enabled = true;

    await render(
      <template>
        {{#if context.enabled}}
          <CopyButton @text="text">
            Click To Copy
          </CopyButton>
        {{/if}}
      </template>,
    );

    assert.dom('.copy-btn').exists('Component rendered');

    context.enabled = false;

    await rerender();

    assert.dom('.copy-btn').doesNotExist('Component cleaned up');
  });

  test('component renders and cleans up with delegateClickEvent: false', async function (assert) {
    context.enabled = true;

    await render(
      <template>
        {{#if context.enabled}}
          <CopyButton @text="text" @delegateClickEvent={{false}}>
            Click To Copy
          </CopyButton>
        {{/if}}
      </template>,
    );

    assert.dom('.copy-btn').exists('Component rendered');

    context.enabled = false;

    await rerender();

    assert.dom('.copy-btn').doesNotExist('Component cleaned up');
  });

  test('components renders text', async function (assert) {
    await render(<template><CopyButton /></template>);

    assert.dom('*').hasText('', 'Component renders no text without block');

    await render(
      <template>
        <CopyButton>
          Click To Copy
        </CopyButton>
      </template>,
    );

    assert
      .dom('*')
      .hasText('Click To Copy', 'Component yields text with block');
  });

  test('callback action fires', async function (assert) {
    assert.expect(1);

    context.callback = () => {
      assert.ok(true, 'callback closure action successfully called');
    };

    await render(
      <template>
        <CopyButton
          @text="text"
          @onError={{context.callback}}
          @onSuccess={{context.callback}}
        >
          Click To Copy
        </CopyButton>
      </template>,
    );

    await click('button');
  });

  test('error action fires with delegateClickEvent: false', async function (assert) {
    context.callback = () => {
      assert.ok(true, '`error` action successfully called');
    };

    await render(
      <template>
        <CopyButton
          @text="text"
          @onError={{context.callback}}
          @onSuccess={{context.callback}}
          @delegateClickEvent="false"
        >
          Click To Copy
        </CopyButton>
      </template>,
    );

    await click('button');
  });

  test('click scoped to document.body', async function (assert) {
    context.callback = () => {
      assert.ok(true, 'callback action successfully called');
    };

    await render(
      <template>
        <CopyButton
          class="copy-button"
          @text="text"
          @onError={{context.callback}}
          @onSuccess={{context.callback}}
        >
          Click To Copy
        </CopyButton>
      </template>,
    );

    // even though remove node, document.body is still listening
    const el = document.querySelector('.copy-button');
    const clone = el?.cloneNode(true);

    if (clone) {
      el?.parentNode?.replaceChild(clone, el);
    }

    await click('.copy-button');
  });

  test('click scoped to element', async function (assert) {
    assert.expect(0);
    context.callback = () => {
      assert.ok(false, 'listener should be removed');
    };

    await render(
      <template>
        <CopyButton
          class="copy-button"
          @text="text"
          @delegateClickEvent={{false}}
          @onError={{context.callback}}
          @onSuccess={{context.callback}}
        >
          Click To Copy
        </CopyButton>
      </template>,
    );

    // remove button and no assertions will be run
    const el = document.querySelector('.copy-button');
    const clone = el?.cloneNode(true);

    if (clone) {
      el?.parentNode?.replaceChild(clone, el);
    }

    await click('.copy-button');
  });

  test('button is not disabled by default', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <CopyButton>
          Click To Copy
        </CopyButton>
      </template>,
    );

    assert
      .dom('.copy-btn')
      .doesNotHaveAttribute('disabled', 'disabled correctly bound to type');
  });

  test('dynamic target', async function (assert) {
    assert.expect(1);

    const getTarget = () => {
      assert.ok(true);
      return document.querySelector('#url-text');
    };

    await render(
      <template>
        <input
          id="url-text"
          type="text"
          value="https://github.com/jkusa/ember-cli-clipboard"
        />
        <CopyButton @target={{getTarget}}>
          Click To Copy
        </CopyButton>
      </template>,
    );
    await click('.copy-btn');
  });

  test('attributeBindings', async function (assert) {
    assert.expect(8);

    await render(
      <template>
        <CopyButton
          @text="text"
          @action="cut"
          @target=".foo"
          aria-label="foo bar"
          title="text"
          disabled={{true}}
        >
          Click To Copy
        </CopyButton>
      </template>,
    );

    const btn = '.copy-btn';

    assert
      .dom(btn)
      .hasAttribute(
        'data-clipboard-text',
        'text',
        'text correctly bound to data-clipboard-text',
      );

    assert
      .dom(btn)
      .hasAttribute(
        'data-clipboard-target',
        '.foo',
        'target correctly bound to data-clipboard-target',
      );

    assert
      .dom(btn)
      .hasAttribute(
        'data-clipboard-action',
        'cut',
        'action correctly bound to data-clipboard-action',
      );

    assert.dom(btn).isDisabled('disabled attribute correctly passed through');

    assert
      .dom(btn)
      .hasAttribute(
        'aria-label',
        'foo bar',
        'aria-label attribute attribute correctly passed through',
      );

    assert
      .dom(btn)
      .hasAttribute('title', 'text', 'text correctly bound to title');

    assert
      .dom(btn)
      .hasAttribute('type', 'button', 'button type is button by default');

    await render(
      <template>
        <CopyButton type="reset">
          Click To Copy
        </CopyButton>
      </template>,
    );

    assert
      .dom(btn)
      .hasAttribute('type', 'reset', 'button type is set by `type` attribute');
  });

  test('dynamic text', async function (assert) {
    assert.expect(3);

    context.text = () => {
      assert.step('one');
      return 'text 1';
    };

    await render(
      <template>
        <CopyButton @text={{context.text}} data-test="copy-btn">
          Click To Copy
        </CopyButton>
      </template>,
    );

    await click('[data-test="copy-btn"]');

    context.text = () => {
      assert.step('two');
      return 'text 2';
    };
    await rerender();

    await click('[data-test="copy-btn"]');

    assert.verifySteps(['one', 'two']);
  });
});
