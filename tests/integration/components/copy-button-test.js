import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

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
   * Can only test error case here b/c browsers do not allow simulated
   * clicks for `execCommand('copy')`
   */
  this.$('button').click();
});
