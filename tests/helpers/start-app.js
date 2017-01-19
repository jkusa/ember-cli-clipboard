import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import registerTestHelpers from '../helpers/ember-cli-clipboard';

registerTestHelpers();

const merge = Ember.assign || Ember.merge;

export default function startApp(attrs) {
  let application;

  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
