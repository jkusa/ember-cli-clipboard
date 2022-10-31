// eslint-disable-next-line ember/no-classic-components
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { arg, forbidExtraArgs } from 'ember-arg-types';
import { string, oneOf, boolean, oneOfType, func, element } from 'prop-types';

@forbidExtraArgs
export default class CopyButtonComponent extends Component {
  guid = guidFor(this);

  @arg(oneOfType([string, func]))
  text;

  @arg(oneOfType([string, func]))
  target;

  @arg(oneOf(['copy', 'cut']))
  action;

  @arg(boolean)
  delegateClickEvent;

  @arg(oneOfType([string, element]))
  container;

  @arg(string)
  buttonType = 'button';

  @arg(boolean)
  onError;

  @arg(boolean)
  onSuccess;
}
