import Application from '../../app';
import config from '../../config/environment';
import registerTestHelpers from '../helpers/ember-cli-clipboard';
import { merge } from '@ember/polyfills';
import { run } from '@ember/runloop';

registerTestHelpers();
export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}
