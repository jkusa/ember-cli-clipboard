import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  triggerError,
  triggerSuccess
} from '../../helpers/ember-cli-clipboard';

moduleForComponent('copy-button', 'Integration | Component | copy button', {
  integration: true
});

test('component renders and cleans up', function(assert) {
  assert.expect(2);

  this.set('enabled', true);
  this.render(hbs`
    {{#if enabled}}
      {{#copy-button
        clipboardText='text'
      }}
        Click To Copy
      {{/copy-button}}
    {{/if}}
  `);

  assert.ok(!!this.$('.copy-btn').length, 'Component rendered');

  this.set('enabled', false);
  assert.notOk(!!this.$('.copy-btn').length, 'Component cleaned up');
});

test('components renders text', function(assert) {
  assert.expect(2);

  this.render(hbs`{{copy-button}}`);

  assert.equal(this.$().text().trim(),
    '',
  'Component renders no text without block');

  this.render(hbs`
    {{#copy-button}}
      Click To Copy
    {{/copy-button}}
  `);

  assert.equal(this.$().text().trim(),
    'Click To Copy',
  'Component yields text with block');
});

test('error action fires', function(assert) {
  assert.expect(1);

  this.on('error', () => {
    assert.ok(true, 'error action successfully called');
  });

  this.render(hbs`
    {{#copy-button
      clipboardText='text'
      success='success'
      error='error'
    }}
      Click To Copy
    {{/copy-button}}
  `);

  /*
   * Can only directly test error case here b/c browsers do not allow simulated
   * clicks for `execCommand('copy')`. See test-helpers to test action integration.
   */
  this.$('button').click();
});

test('test-helpers fire correct actions', function(assert) {
  assert.expect(2);

  this.on('success', () => {
    assert.notOk(true, 'success action incorrectly fired');
  });

  this.set('error', () => {
    assert.ok(true, 'triggerError correctly fired `error` action for selector');
  });

  this.render(hbs`
    {{#copy-button
      classNames='my-copy-btn'
      clipboardText='text'
      success='success'
      error=(action error)
    }}
      Click To Copy
    {{/copy-button}}
  `);

  triggerError(this, '.my-copy-btn');

  this.set('error', () => {
    assert.notOk(true, 'error action incorrectly fired');
  });

  this.on('success', () => {
    assert.ok(true, 'triggerSuccess correctly fired `success` action for selector');
  });

  triggerSuccess(this);
});

test('button is not disabled by default', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#copy-button}}
      Click To Copy
    {{/copy-button}}
  `);

  assert.equal(this.$('.copy-btn').attr('disabled'),
    undefined,
  'disabled correctly bound to type');
});

test('attributeBindings', function(assert) {
  assert.expect(6);

  this.render(hbs`
    {{#copy-button
      clipboardText='text'
      clipboardAction='cut'
      clipboardTarget='.foo'
      disabled=true
      title='text'
    }}
      Click To Copy
    {{/copy-button}}
  `);

  let btn = this.$('.copy-btn');

  assert.equal(btn.attr('data-clipboard-text'),
    'text',
  'clipboardText correctly bound to data-clipboard-text');

  assert.equal(btn.attr('data-clipboard-target'),
    '.foo',
  'clipboardTarget correctly bound to data-clipboard-target');

  assert.equal(btn.attr('data-clipboard-action'),
    'cut',
  'clipboardAction correctly bound to data-clipboard-action');

  assert.equal(btn.attr('type'),
    'button',
  'buttonType correctly bound to type');

  assert.equal(btn.attr('disabled'),
    'disabled',
  'disabled correctly bound to type');

  assert.equal(btn.attr('title'),
    'text',
  'text correctly bound to title');
});
