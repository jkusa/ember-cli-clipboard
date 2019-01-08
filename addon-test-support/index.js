import { getContext } from '@ember/test-helpers';
import { run } from '@ember/runloop';

/**
 * Fires `success` action for an instance of a copy-button component
 * @function triggerCopySuccess
 * @param {String} selector - css selector of the copy-button instance
 * @returns {Void}
 */
export function triggerCopySuccess(selector) {
  const { owner } = getContext();
  _fireComponentAction(owner, selector, 'success');
}

/**
 * Fires `error` action for an instance of a copy-button component
 * @function triggerCopyError
 * @param {String} selector - css selector of the copy-button instance
 * @returns {Void}
 */
export function triggerCopyError(selector) {
  const { owner } = getContext();
  _fireComponentAction(owner, selector, 'error');
}

/**
 * Fires named action for an instance of a copy-button component
 * @function _fireComponentAction
 * @param {Object} owner - an owner object
 * @param {String} selector - css selector of the copy-button instance
 * @param {String} actionName - name of action
 * @returns {Void}
 */
export function _fireComponentAction(owner, selector, actionName) {
  const component = _getComponentBySelector(owner, selector);
  _fireActionByName(component, actionName);
}

/**
 * Fetches component reference for a given context and selector
 * @function getComponentBySelector
 * @param {Object} owner - an owner object
 * @param {String} [selector='.copy-btn'] - css selector of the copy-button instance
 * @returns {Ember.Component} component object
 */
function _getComponentBySelector(owner, selector = '.copy-btn') {
  const emberId = document.querySelector(selector).getAttribute('id');
  return owner.lookup('-view-registry:main')[emberId];
}

/**
 * Fires a component's action given an action name
 * @function fireActionByName
 * @param {Ember.Component} component - component to fire action from
 * @param {String} actionName - name of action
 * @returns {Void}
 */
function _fireActionByName(component, actionName) {
  const action = component[actionName];

  run(() => {
    if (typeof action === 'string') {
      component.sendAction(action);
    } else {
      action();
    }
  });
}
