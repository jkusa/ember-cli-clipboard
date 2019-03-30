import { _fireComponentAction as fireComponentAction } from 'ember-cli-clipboard/test-support';
import { registerAsyncHelper } from '@ember/test';

const getOwnerFromContext = c => c.container || c.owner;

/* === Legacy Integration Test Helpers === */

/**
 * Fires `success` action for an instance of a copy-button component
 * @function triggerSuccess
 * @param {Object} context - integration test’s this context
 * @param {String} selector - css selector of the copy-button instance
 * @returns {Void}
 */
export function triggerSuccess(context, selector) {
  const owner = getOwnerFromContext(context);
  fireComponentAction(owner, selector, 'success');
}

/**
 * Fires `error` action for an instance of a copy-button component
 * @function triggerError
 * @param {Object} context - integration test’s this context
 * @param {String} selector - css selector of the copy-button instance
 * @returns {Void}
 */
export function triggerError(context, selector) {
  const owner = getOwnerFromContext(context);
  fireComponentAction(owner, selector, 'error');
}

/* === Register Legacy Acceptance Test Helpers === */

export default function() {
  registerAsyncHelper('triggerCopySuccess', function(app, selector) {
    const owner = app.__container__;
    fireComponentAction(owner, selector, 'success');
  });

  registerAsyncHelper('triggerCopyError', function(app, selector) {
    const owner = app.__container__;
    fireComponentAction(owner, selector, 'error');
  });
}
