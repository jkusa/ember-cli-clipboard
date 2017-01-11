import Ember from 'ember';
import layout from '../templates/components/code-block';

export default Ember.Component.extend({
  layout,

  classNames: ['container-code', 'highlight'],

  lang: 'hbs',

  didRender() {
    hljs.highlightBlock(this.$('pre code')[0]);
  }
});
