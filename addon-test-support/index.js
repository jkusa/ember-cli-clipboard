import Ember from 'ember';
import { getContext } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';

/**
 * Fires `success` action for an instance of a copy-button component
 * @function triggerCopySuccess
 * @param {String} selector - css selector of the copy-button instance
 * @returns {Void}
 */
export function triggerCopySuccess(selector) {
  const { owner } = getContext();
  _fireComponentAction(owner, selector, 'onSuccess');
}

/**
 * Fires `error` action for an instance of a copy-button component
 * @function triggerCopyError
 * @param {String} selector - css selector of the copy-button instance
 * @returns {Void}
 */
export function triggerCopyError(selector) {
  const { owner } = getContext();
  _fireComponentAction(owner, selector, 'onError');
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
  const renderTree = Ember._captureRenderTree(owner);
  const guid = document.querySelector(selector).id;
  return _findComponentInstance(renderTree[0], guid);
}

function _findComponentInstance(node, guid) {
  if (guidFor(node.instance) === guid) {
    return node.instance;
  }

  const { children = [] } = node;
  return children.map((c) => _findComponentInstance(c, guid)).find((c) => c);
}

/**
 * Fires a component's action given an action name
 * @function fireActionByName
 * @param {Ember.Component} component - component to fire action from
 * @param {String} actionName - name of action
 * @returns {Void}
 */
function _fireActionByName(component, actionName) {
  const action = component.args[actionName];
  run(() => action());
}
