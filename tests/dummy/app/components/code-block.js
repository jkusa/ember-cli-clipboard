import Component from '@ember/component';
import layout from '../templates/components/code-block';

export default Component.extend({
  layout,

  classNames: ['container-code', 'highlight'],

  lang: 'hbs',

  didRender() {
    hljs.highlightBlock(this.$('pre code')[0]);
  }
});
