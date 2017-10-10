import { run } from '@ember/runloop';
import Test from 'ember-test';

/* === Integration Test Helpers === */

/**
 * Fires `success` action for an instance of a copy-button component
 * @function triggerSuccess
 * @param {Object} context - integration test’s this context
 * @param {String|Element} selector - selector of the copy-button instance
 * @returns {Void}
 */
export function triggerSuccess(context, selector) {
  fireComponentAction(context, selector, 'success');
}

/**
 * Fires `error` action for an instance of a copy-button component
 * @function triggerError
 * @param {Object} context - integration test’s this context
 * @param {String|Element} selector - selector of the copy-button instance
 * @returns {Void}
 */
export function triggerError(context, selector) {
  fireComponentAction(context, selector, 'error');
}

/* === Acceptance Test Helpers === */

/**
 * Default export is a function that registers acceptance test helpers
 */
export default function() {
  Test.registerAsyncHelper('triggerCopySuccess', function(app, selector='.copy-btn') {
    fireComponentActionFromApp(app, selector, 'success');
  });

  Test.registerAsyncHelper('triggerCopyError', function(app, selector='.copy-btn') {
    fireComponentActionFromApp(app, selector, 'error');
  });
}

/* === Private Functions === */

/**
 * Fires named action for an instance of a copy-button component in an app
 * @function fireComponentActionFromApp
 * @param {Object} app - Ember application
 * @param {String|Element} selector - selector of the copy-button instance
 * @param {String} actionName - name of action
 * @returns {Void}
 */
function fireComponentActionFromApp(app, selector, actionName) {
  fireComponentAction({
    container: app.__container__,
    $: app.$
  }, selector, actionName);
}

/**
 * Fires named action for an instance of a copy-button component
 * @function fireComponentAction
 * @param {Object} context - test context
 * @param {String|Element} selector - selector of the copy-button instance
 * @param {String} actionName - name of action
 * @returns {Void}
 */
function fireComponentAction(context, selector, actionName) {
  let component = getComponentBySelector(context, selector);
  fireActionByName(component, actionName);
}

/**
 * Fetches component reference for a given context and selector
 * @function getComponentBySelector
 * @param {Object} context - test context
 * @param {String|Element} selector - selector of the copy-button instance
 * @returns {Object} component object
 */
function getComponentBySelector(context, selector='.copy-btn') {
  let emberId = context.$(selector).attr('id');
  return context.container.lookup('-view-registry:main')[emberId];
}

/**
 * Fires a component's action given an action name
 * @function fireActionByName
 * @param {Ember.Component} component - component to fire action from
 * @param {String} actionName - name of action
 * @returns {Void}
 */
function fireActionByName(component, actionName) {
  let action = component[actionName];

  run(() => {
    if (typeof action === 'string') {
      component.sendAction(action);
    } else {
      action();
    }
  });
}
