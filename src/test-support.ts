import { captureRenderTree } from '@ember/debug';
import { getContext } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';

import type Owner from '@ember/owner';
import type Component from '@glimmer/component';

interface RenderNode {
  instance: unknown;
  children?: RenderNode[];
}

type CopyButtonInstance = Component<{
  Args: {
    onSuccess?: (...args: unknown[]) => void;
    onError?: (...args: unknown[]) => void;
  };
}>;

/**
 * Fires `success` action for an instance of a copy-button component
 * @param selector - css selector of the copy-button instance
 */
export function triggerCopySuccess(selector?: string): void {
  const { owner } = getContext() as { owner: Owner };
  _fireComponentAction(owner, selector, 'onSuccess');
}

/**
 * Fires `error` action for an instance of a copy-button component
 * @param selector - css selector of the copy-button instance
 */
export function triggerCopyError(selector?: string): void {
  const { owner } = getContext() as { owner: Owner };
  _fireComponentAction(owner, selector, 'onError');
}

/**
 * Fires named action for an instance of a copy-button component
 * @param owner - an owner object
 * @param selector - css selector of the copy-button instance
 * @param actionName - name of action
 */
export function _fireComponentAction(
  owner: Owner,
  selector: string | undefined,
  actionName: 'onSuccess' | 'onError',
): void {
  const component = _getComponentBySelector(owner, selector);
  _fireActionByName(component, actionName);
}

/**
 * Fetches component reference for a given owner and selector
 * @param owner - an owner object
 * @param selector - css selector of the copy-button instance
 * @returns component instance
 */
function _getComponentBySelector(
  owner: Owner,
  selector = '.copy-btn',
): CopyButtonInstance {
  const renderTree = captureRenderTree(owner);
  const element = document.querySelector<HTMLElement>(selector);
  const guid = element?.dataset['clipboardId'];
  const instance = _findComponentInstance(renderTree[0], guid);

  if (!instance) {
    throw new Error(
      `Could not find a copy-button instance for selector "${selector}"`,
    );
  }

  return instance;
}

function _findComponentInstance(
  node: RenderNode | undefined,
  guid: string | undefined,
): CopyButtonInstance | undefined {
  if (!node) {
    return undefined;
  }

  if (guidFor(node.instance) === guid) {
    return node.instance as CopyButtonInstance;
  }

  const { children = [] } = node;
  return children
    .map((child) => _findComponentInstance(child, guid))
    .find((child) => child);
}

/**
 * Fires a component's action given an action name
 * @param component - component to fire action from
 * @param actionName - name of action
 */
function _fireActionByName(
  component: CopyButtonInstance,
  actionName: 'onSuccess' | 'onError',
): void {
  const action = component.args[actionName];
  // eslint-disable-next-line ember/no-runloop
  run(() => action?.());
}
