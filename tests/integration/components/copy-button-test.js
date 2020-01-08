import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | copy button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test('component renders and cleans up', async function(assert) {
    assert.expect(2);

    this.set('enabled', true);
    await render(hbs`
      {{#if enabled}}
        <CopyButton
          @clipboardText="text"
        >
          Click To Copy
        </CopyButton>
      {{/if}}
    `);

    assert.dom('.copy-btn').exists('Component rendered');

    this.set('enabled', false);
    assert.dom('.copy-btn').doesNotExist('Component cleaned up');
  });

  test('component renders and cleans up with delegateClickEvent: false', async function(assert) {
    assert.expect(2);

    this.set('enabled', true);
    await render(hbs`
      {{#if enabled}}
        <CopyButton
          @clipboardText="text"
          @delegateClickEvent={{false}}
        >
          Click To Copy
        </CopyButton>
      {{/if}}
    `);

    assert.dom('.copy-btn').exists('Component rendered');

    this.set('enabled', false);
    assert.dom('.copy-btn').doesNotExist('Component cleaned up');
  });

  test('components renders text', async function(assert) {
    assert.expect(2);

    await render(hbs`{{copy-button}}`);

    assert.dom('*').hasText('', 'Component renders no text without block');

    await render(hbs`
      <CopyButton>
        Click To Copy
      </CopyButton>
    `);

    assert
      .dom('*')
      .hasText('Click To Copy', 'Component yields text with block');
  });

  test('callback action fires', async function(assert) {
    assert.expect(1);

    this.set('callback', () =>
      assert.ok(true, 'callback closure action successfully called')
    );

    await render(hbs`
      <CopyButton
        @clipboardText="text"
        @error={{this.callback}}
        @success={{this.callback}}
      >
        Click To Copy
      </CopyButton>
    `);

    await click('button');
  });

  test('error action fires with delegateClickEvent: false', async function(assert) {
    assert.expect(1);

    this.set('callback', () =>
      assert.ok(true, '`error` action successfully called')
    );

    await render(hbs`
      <CopyButton
        @clipboardText="text"
        @error={{this.callback}}
        @success={{this.callback}}
        @delegateClickEvent=false
      >
        Click To Copy
      </CopyButton>
    `);

    await click('button');
  });

  test('click scoped to document.body', async function(assert) {
    assert.expect(1);

    this.set('callback', () =>
      assert.ok(true, 'callback action successfully called')
    );

    await render(hbs`
      <CopyButton
        class="copy-button"
        @clipboardText="text"
        @error={{action callback}}
        @success={{action callback}}
      >
        Click To Copy
      </CopyButton>
  `);

    // even though remove node, document.body is still listening
    let el = document.querySelector('.copy-button');
    let clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);

    await click('.copy-button');
  });

  test('click scoped to element', async function(assert) {
    assert.expect(0);

    this.set('callback', () => assert.ok(false, 'listener should be removed'));

    await render(hbs`
      <CopyButton
        class="copy-button"
        @clipboardText="text"
        @delegateClickEvent={{false}}
        @error={{action callback}}
        @success={{action callback}}
      >
        Click To Copy
      </CopyButton>
    `);

    // remove button and no assertions will be run
    let el = document.querySelector('.copy-button');
    let clone = el.cloneNode(true);
    el.parentNode.replaceChild(clone, el);

    await click('.copy-button');
  });

  test('button is not disabled by default', async function(assert) {
    assert.expect(1);

    await render(hbs`
      <CopyButton>
        Click To Copy
      </CopyButton>
    `);

    assert
      .dom('.copy-btn')
      .doesNotHaveAttribute('disabled', 'disabled correctly bound to type');
  });

  test('attributeBindings', async function(assert) {
    assert.expect(8);

    await render(hbs`
      <CopyButton
        @aria-label="foo bar"
        @title="text"
        @clipboardText="text"
        @clipboardAction="cut"
        @clipboardTarget=".foo"
        @disabled={{true}}
      >
        Click To Copy
      </CopyButton>
    `);

    const btn = '.copy-btn';

    assert
      .dom(btn)
      .hasAttribute(
        'data-clipboard-text',
        'text',
        'clipboardText correctly bound to data-clipboard-text'
      );

    assert
      .dom(btn)
      .hasAttribute(
        'data-clipboard-target',
        '.foo',
        'clipboardTarget correctly bound to data-clipboard-target'
      );

    assert
      .dom(btn)
      .hasAttribute(
        'data-clipboard-action',
        'cut',
        'clipboardAction correctly bound to data-clipboard-action'
      );

    assert
      .dom(btn)
      .hasAttribute('disabled', '', 'disabled correctly bound to type');

    assert
      .dom(btn)
      .hasAttribute(
        'aria-label',
        'foo bar',
        'aria-label attribute correctly bound'
      );

    assert
      .dom(btn)
      .hasAttribute('title', 'text', 'text correctly bound to title');

    assert
      .dom(btn)
      .hasAttribute('type', 'button', 'button type is button by default');

    await render(hbs`
      <CopyButton
        @buttonType="reset"
      >
        Click To Copy
      </CopyButton>
    `);
  
    assert
      .dom(btn)
      .hasAttribute('type', 'reset', 'button type is set by @buttonType arg');
  });
});
